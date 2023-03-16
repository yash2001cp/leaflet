# cogo-maps service


## Backend

To manually create a virtualenv on MacOS and Linux:

```
python3 -m venv .venv
```

After the init process completes and the virtualenv is created, you can use the following step to activate your virtualenv.
```
source .venv/bin/activate
```
## CogoMaps CLI
Cogo-Maps ships with a robust CLI, providing server,shell and more to come commands. Below is the partial overview of these commands

Run this command before we start
```
pip install --editable .
```

## Server

The server sub-command contains all server-related commands.

```bash
> maps server --help                                                                        develop ⬇ ◼
Usage: maps server [OPTIONS] COMMAND [ARGS]...

  Container for all maps server commands.

Options:
  --help  Show this message and exit.

Commands:
  develop  Runs a simple server for development.
  shell    Starts an ipython shell importing our app.
  start
```

### Develop

The `develop` command starts the development server if a port is busy it will select the next port. This server will continually watch for file changes and reload the server accordingly.

```bash
> maps server develop
```

### Shell

The `shell` command is useful for development. It drops you into an python shell with the database connection.

```bash
> maps server shell
```

### Start

The `start` command starts a web server. It's an alias to the [uvicorn](https://www.uvicorn.org/) web server, it contains all of the options and flags available with that server.

```bash
> maps server start --help
Usage: maps server start [OPTIONS] main:app

Options:
  --host TEXT                     Bind socket to this host.  [default:
                                  127.0.0.1]
  --port INTEGER                  Bind socket to this port.  [default: 8000]
  --uds TEXT                      Bind to a UNIX domain socket.
  --fd INTEGER                    Bind to socket from this file descriptor.
  --reload                        Enable auto-reload.
  --reload-dir TEXT               Set reload directories explicitly, instead
                                  of using the current working directory.
  ...
```

Once the virtualenv is activated, you can install the required dependencies.
python3 -m pip install --upgrade -r requirements.txt
```

After Installing the dependencies you can run server using

```
cd app
```
```
uvicorn main:app --reload --port 8000
```

You can generate the requirement file using your virtualenv using
```
pip3 freeze > requirements.txt
```

