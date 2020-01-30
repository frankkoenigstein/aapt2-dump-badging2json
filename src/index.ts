const valueEx = /\s*(([^=]+)=)?'([^']*)'/gm;

export function badging2Json(dump: string): string {
  const dumpObject: object = dump
    .match(/[^\r\n]+/g) // split lines
    .map(
      (line: string): RegExpMatchArray => line.match(/^\s*([^:\s]+)[:]?\s*(.*)/)
    )
    // extract line key value
    .map(([, g1, g2]: RegExpMatchArray): string[] => [g1, g2])
    // split values
    .map(([key, value]: [string, string]): [string, RegExpExecArray[]] => {
      const ms: RegExpExecArray[] = [];
      let m: RegExpExecArray = valueEx.exec(value);

      while (m !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === valueEx.lastIndex) {
          valueEx.lastIndex++;
        }

        // The result can be accessed through the `m`-variable.
        // m.forEach((match, groupIndex) => {
        //   console.log(`Found match, group ${groupIndex}: ${match}`);
        // });

        ms.push(m);
        m = valueEx.exec(value);
      }

      return [key, ms];
    })
    // extract interesting match groups
    .map(([key, values]): [string, string[][]] => [
      key,
      values.map((match: RegExpExecArray): string[] => [match[2], match[3]])
    ])
    // reduce to array or object if values are named
    .map(([key, values]): [string, string[] | { [key: string]: string }] => [
      key,
      values.reduce((acc: any, [name, value]: [string, string]):
        | string[]
        | { [key: string]: string } => {
        if (!name) {
          if (!acc) {
            acc = [];
          }
          acc = [...acc, value];
        } else {
          if (!acc) {
            acc = {};
          }

          acc[name] = value;
        }

        return acc;
      }, null)
    ])
    // use single value of arrays with length 1
    .map(([key, values]): [
      string,
      string | string[] | { [key: string]: string }
    ] => {
      if (Array.isArray(values) && values.length === 1) {
        return [key, values.shift()];
      }

      return [key, values];
    })
    // combine duplicate line keys
    .reduce((acc: { [key: string]: any }, [key, values]: [string, any]): {
      [key: string]: any;
    } => {
      // in case of duplicate keys, create array
      if (acc[key]) {
        // if already an array just push new value
        if (Array.isArray(acc[key])) {
          acc[key].push(values);
        } else {
          // create array with values
          acc[key] = [acc[key], values];
        }
      } else {
        acc[key] = values;
      }

      return acc;
    }, {});

  return JSON.stringify(dumpObject);
}
