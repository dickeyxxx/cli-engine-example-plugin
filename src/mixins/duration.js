// @flow

import type Command from 'cli-engine-command'

export const FLAG = {
  name: 'duration',
  description: 'a duration',
  required: true,
  hasValue: true
}

export default class Duration {
  cmd: Command
  constructor (cmd: Command) {
    this.cmd = cmd
    // setTimeout(this.cmd.reject, this.parse(this.cmd.flags.duration))
  }
  parse(arg : string){
    let result = arg.match(/^(\d+) ?(ms|[sm]|milliseconds?|seconds?|minutes?)$/);
    if (result) {
      let magnitude = parseInt(result[1]);
      let unit = result[2];
      let multiplier = 1;
      switch (unit) {
        case 'ms':
        case 'millisecond':
        case 'milliseconds':
          multiplier = 1;
          break;
        case 's':
        case 'second':
        case 'seconds':
          multiplier = 1000;
          break;
        case 'm':
        case 'minute':
        case 'minutes':
          multiplier = 1000 * 60;
          break;
        default:
          // throw new Exception(`could not parse '${arg}'`)
      }
      return magnitude * multiplier;
    }
  }

  get duration (): number {
    let duration = this.parse(this.cmd.flags.duration)
    return Number(duration)
  }
}
