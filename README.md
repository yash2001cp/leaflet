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
### CogoMaps CLI
Cogo-Maps provides with a CLI, providing server,shell and more to come commands

Run this command before we start
```
pip install --editable .
```

### Server

The server sub-command contains all server-related commands.

```bash
> maps server --help
Usage: maps server [OPTIONS] COMMAND [ARGS]...

  Container for all maps server commands.

Options:
  --help  Show this message and exit.

Commands:
  develop  Runs a simple server for development.
  shell    Starts an ipython shell importing our app.
  start
```

#### Develop

The `develop` command starts the development server if a port is busy it will select the next port. This server will continually watch for file changes and reload the server accordingly.

```bash
> maps server develop
```

#### Shell

The `shell` command is useful for development. It drops you into an python shell with the database connection.

```bash
> maps server shell
```

### WITHOUT USING CogoMaps CLI

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

