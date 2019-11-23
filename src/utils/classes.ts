export const classes = (
  /**
   * map of class names to if they should be present in the resulting list
   *
   *    // example
   *    assertEqual(
   *      classes({ no: false, ['yes'+2]: true, foo: 1 }),
   *      "yes2 foo"
   *    )
   */
  obj: Record<string, any>,
) => Object.entries(obj)
  .filter(([, v]) => Boolean(v))
  .map(([k]) => k)
  .join(' ') || undefined;
