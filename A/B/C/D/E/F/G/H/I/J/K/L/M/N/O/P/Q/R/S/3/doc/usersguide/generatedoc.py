#!/usr/bin/python3

import sys
import os, time
import subprocess
import platform
import shutil
import argparse



INPUTS = ['Main.md',
          'Footnotes.md']


ROOTDIR = os.path.normpath(os.path.dirname(sys.argv[0]))

# BEGIN of Commandline arguments
PARSER = argparse.ArgumentParser(description='UsersGuide generator')
PARSER.add_argument('-html', help='Generate html outputd', action='store_true')
PARSER.add_argument('-pdf',  help='Generate pdf output', action='store_true')
PARSER.add_argument('-docx',  help='Generate docx output', action='store_true')
PARSER.add_argument('-css',  help='CSS style file', dest='css')


COMMON_OPTIONS = ['pandoc', '-S', '--toc', '--normalize', '-f',  'markdown']

# END of Commandline arguments
  
def safedircreate(filename, parent=None):
  try:
    if parent:
      os.makedirs(os.path.abspath(os.path.dirname(filename)))
    else:
      os.makedirs(os.path.abspath(filename))
  except OSError:
    return False
  return True
  

def run_program(logfileName, programName, command):
  try:
    with open(logfileName, 'a') as logfile:
      subprocess.check_call(list(filter(None, command)) , stderr=subprocess.STDOUT, stdout=logfile)
      logfile.write(programName + ' Succeeded\n')
  except subprocess.CalledProcessError as cmderror:
    print('    %s Failed' % (programName))
    print('    %s CMD: %s' % (programName, str(cmderror.cmd)))
    return False
  except OSError as oserror:
    print('    %s Failed' % (programName))
    print('    %s Error: %s' % (programName, str(oserror)))
    with open(logfileName, 'a') as logfile:
      logfile.write(programName + ' Failed:\n' + str(oserror) + '\n\n')
    return False
  return True

def main():
  args = PARSER.parse_args()
  files = []  
  for i in INPUTS:
      files.append(os.path.join(ROOTDIR, 'md', i))
  safedircreate(os.path.join(ROOTDIR, 'results'))
  extra_options = []
  if args.css:
      extra_options.append('-c')
      extra_options.append(args.css)
  successful = True
  if args.html:
      print('Generating HTML ...', flush = True)
      successful &= run_program('html.log', 'pandoc', COMMON_OPTIONS + ['--self-contained', '-t', 'html5', '-o' , 'results/UG.html'] + extra_options + files)

  if args.pdf:
      print('Generating PDF ...', flush = True)
      successful &= run_program('pdf.log', 'pandoc', COMMON_OPTIONS + ['-o' , 'results/UG.pdf'] + extra_options + files)

  if args.docx:
      print('Generating DOCX ...', flush = True)
      successful &= run_program('docx.log', 'pandoc', COMMON_OPTIONS + ['-o' , 'results/UG.docx'] + extra_options + files)

  return 0 if successful else 1

if __name__ == '__main__':
  sys.exit(main())
