import React from 'react'
import ReactDOM from 'react-dom'

const notes = 'abcdefg'.split('')
const sharps = 'acdfg'.split('')

const classes = (obj: Record<string, any>) => (
	Object.entries(obj)
		.filter(([ , v]) => Boolean(v))
		.map(([ k ]) => k)
		.join(' ') || undefined
)

interface KeyProps {
	note: string
	octave: number
	onClickWhite: () => void
	onClickBlack: () => void
	whiteClass?: string
	blackClass?: string
}
const Key = ({ note, octave, onClickWhite, onClickBlack, whiteClass, blackClass }: KeyProps) => {
	return (
		<div
			className={classes({
				white: true,
				note: true,
				[note]: note,
				[`octave-${octave}`]: true,
				[whiteClass || '']: whiteClass,
			})}
			onMouseDown={onClickWhite}
		>
			{sharps.includes(note) ? (
				<div
					className={classes({
						black: true,
						note: true,
						[`${note}-sharp`]: note,
						[`octave-${octave}`]: true,
						[blackClass || '']: whiteClass,
					})}
					onMouseDown={(event) => {
						onClickBlack()
						event.stopPropagation()
					}}
				>
					<div>
						<div>{note}<sup>#</sup></div>
						<div>
							{notes[(notes.indexOf(note)+1) % notes.length]}
							<sup style={{ textTransform: 'lowercase' }}>b</sup>
						</div>
					</div>
				</div>
			) : undefined}
			{note}
		</div>
	)
}

const Keyboard = () => {
	const [pressed, setPressed] = React.useState<{ octave: number, note: string } | undefined>()

	console.log(pressed)

	return (
		<div
			className='keyboard'
			// onMouseUp={() => {
			// 	setPressed(undefined)
			// }}
		>
			{Array.from({ length: 52 }, (_, i) => {
				const note = notes[i % notes.length]
				const octave = Math.floor((i + 5) / notes.length) // start on A0 and B0
				return (
					<Key
						key={i}
						note={note}
						octave={octave}
						onClickWhite={() => {
							setPressed({ note, octave })
						}}
						onClickBlack={() => {
							setPressed({ note, octave })
						}}
					/>
				)
			})}
		</div>
	)
}

ReactDOM.render(
	<Keyboard />,
	document.getElementById('root'),
)