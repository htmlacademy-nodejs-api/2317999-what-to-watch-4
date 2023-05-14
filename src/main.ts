#!/usr/bin/env node
import { readFile } from 'node:fs/promises';
import chalk from 'chalk';


class TsvReader {
  private commands: string[] = [];
  private input: string[];
  // private attributes: string[] = [];

  constructor(input: string[]) {
    this.input = input;
  }

  private parseInput() {
    this.commands = this.input.filter((arg) => arg.startsWith('--'));
    // this.attributes = this.input.filter((arg) => !arg.startsWith('--'));
  }

  public help() {
    console.info('help');
  }

  public version() {
    return readFile('package.json', 'utf8').then((data: string) => {
      const packageJson = JSON.parse(data);
      console.info(chalk.blue.italic(packageJson.version));
    }).catch((err: Error) => {
      console.error(err);
    });
  }

  private readData(filePath: string) {
    return readFile(filePath, 'utf8').then((data: string) => {
      const lines = data.split('\n');
      const headers = lines[0].split('\t');
      const rows = lines.slice(1);

      const parsedRows = rows.map((row: string) => {
        const values = row.split('\t');
        return headers.reduce((obj: any, header: string, index: number) => {
          obj[header] = values[index];
          return obj;
        }, {});
      });

      console.info(parsedRows);
    }).catch((err: Error) => {
      console.error(err);
    });
  }

  public import() {
    this.readData('mocks/data.tsv');
  }

  public run() {
    this.parseInput();

    if (this.commands[0] === ('--help')) {
      return this.help();
    }
    if (this.commands[0] === ('--version')) {
      return this.version();
    }
    if (this.commands[0] === ('--import')) {
      return this.import();
    }
  }

  public stop() {
    throw new Error('stop');
  }
}

const cli = new TsvReader(process.argv.slice(2));
cli.run();
