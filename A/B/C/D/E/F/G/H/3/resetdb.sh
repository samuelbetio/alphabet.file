#!/usr/bin/python
import os
import settings

db = 'db_data'
python="python"

args = os.sys.argv[1:]

if len(args) == 1:
    python = os.sys.argv[1]
apps = 'static'

cmds = [
    python+' manage.py sqlclear '+apps+' | sqlite3 '+db,
    python+' manage.py sqlreset '+apps+' | sqlite3 '+db,
    python+' manage.py syncdb',
    python+' manage.py loaddata setup',
]

[os.system(cmd) for cmd in cmds]

