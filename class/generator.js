'use strict';

class Generator {
  GenerateOneFromSource(source, allowed=true) {
    let output = 'User-agent:';

    if (typeof source !== 'undefined') {
      for (const item of source) {
        if (item.length !== 0)
        output += item + ','
      }
      output = output.slice(0, -1);
    }

    output += `\n${allowed ? 'Allow:' : 'Disallow:'}/\n`;

    return output;
  }

  GenerateFromSource(source) {
    return (
      this.GenerateOneFromSource(source.alloweds, true) + 
      this.GenerateOneFromSource(source.blockeds, false)
    );
  }
}

export default Generator;
