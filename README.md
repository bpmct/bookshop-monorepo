# bookshop-monorepo

A sample monorepo with multiple services for running a bookshop inventory, including:
- REST API (written in Spring) 
- Database (powered by Postgres)
- CLI (written in Golang)
- Frontend (written in Javascript/React)
- Book sorting (written in Scala)
- Fetch data from Goodreads (written in Python)

![](./frontend/screenshot.png)


## Set up development environment:

[![Open in Coder](https://cdn.coder.com/embed-button.svg)](https://stable.cdr.dev/wac/build?template_oauth_service=github&template_url=https://github.com/bpmct/bookshop-monorepo&template_ref=main&template_filepath=.coder/coder.yaml)

### Or (manual):

- Clone the repository on your local machine
- Install a Postgres server, run [this init script](./infrastructure/aws//store-api/userdata.tpl)
- [**Install Bazel**](https://docs.bazel.build/versions/master/install.html) (Currently supporting ~= `4.x.x`)
- **Python 2 or 3**. Should only be required to [do some bootstrapping under-the-hood](https://github.com/bazelbuild/bazel/issues/8446).
- [**`yarn`**](https://yarnpkg.com/) or [**`npm`**](https://www.npmjs.com/) for the NodeJS and Typescript code
- Install `aws-cli`, `terraform`, `zstd` on your machine

## Credits

This is a fork of [thundergolfer/example-bazel-monorepo](https://github.comthundergolfer/example-bazel-monorepo).
