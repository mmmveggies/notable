import WebMidi, { Input, InputEventNoteon } from 'webmidi';

export class Source {
  readonly subscribers = new Set<Function>()
  readonly notes = new Map<number, InputEventNoteon>()

  private notify() {
    this.subscribers.forEach((fn) => fn())
  }

  constructor(
    public readonly input: Input,
  ) {
    input.addListener('noteon', 'all', (event) => {
      this.notes.set(event.note.number, event)
      this.notify()
    })
    input.addListener('noteoff', 'all', (event) => {
      this.notes.delete(event.note.number)
      this.notify()
    })
  }

  subscribe(onChange: Function) {
    this.subscribers.add(onChange)
    return () => {
      this.subscribers.delete(onChange)
    }
  }
}

export interface SourcesOptions {
  onError?: (error: Error) => void;
  onInput?: (sources: Record<string, Source>) => void
}

export class Sources {
  sources: Record<string, Source> = {}
  error?: Error

  constructor(public readonly opts: SourcesOptions) {
    WebMidi.enable((error) => {
      if (error) {
        this.error = error;
      }
      this.sources = Object.fromEntries(WebMidi.inputs.map((input) => (
        [input.id, new Source(input)]
      )))
    });

    WebMidi.addListener('connected', ({ port }) => {
      if (port.type === 'input') {
        const sources = { ...this.sources, [port.id]: new Source(port) };
        this.sources = sources;
        this.opts.onInput?.(this.sources)
      }
    });
    WebMidi.addListener('disconnected', ({ port }) => {
      if (port.type === 'input') {
        const { [port.id]: _, ...sources } = this.sources;
        this.sources = sources;
        this.opts.onInput?.(this.sources)
      }
    });
  }
}
