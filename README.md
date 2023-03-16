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
### Using CogoMaps CLI
Cogo-Maps provides with a CLI, providing server,shell and more to come commands

Run these commands before we start
```
cd app
```
```
pip install --editable .
```

#### Develop

The `develop` command starts the development server if a port is busy it will select the next port. This server will continually watch for file changes and reload the server accordingly.

```bash
> maps server develop
```
#### Start

The `start` command starts a maps web server of production grade. It's an alias to the [uvicorn](https://www.uvicorn.org/) web server, it contains all of the options available with that server.

```bash
> maps server start --help
Usage: maps server start [OPTIONS] main:app

Options:
  --port INTEGER                  Bind socket to this port.  [default: 8000]
  --reload                        Enable auto-reload.
  --reload-dir TEXT               Sets reload directories explicitly, instead
                                  of using the current working directory.
  ...
```

#### Shell

The `shell` command is useful for development. It drops you into an python shell with the database connection.

```bash
> maps server shell
```

### Without using CogoMaps CLI

Once the virtualenv is activated, you can install the required dependencies.
```
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
