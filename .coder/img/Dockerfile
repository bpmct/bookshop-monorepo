# See our guides for writing custom images:
# https://coder.com/docs/guides/customization

FROM codercom/enterprise-base:ubuntu

USER root

# Install Java 11 and Bazel
RUN apt-get update && apt-get install -y apt-transport-https curl software-properties-common git gcc gnupg2 g++ default-jdk python-dev zip wget vim
RUN wget https://github.com/bazelbuild/bazel/releases/download/4.1.0/bazel-4.1.0-installer-linux-x86_64.sh -O ./bazel-installer.sh && chmod 755 ./bazel-installer.sh
RUN ./bazel-installer.sh

# Install golang
RUN curl -L "https://dl.google.com/go/go1.17.1.linux-amd64.tar.gz" | tar -C /usr/local -xzvf -
ENV GOROOT /usr/local/go
ENV PATH $PATH:$GOROOT/bin
ENV GOPATH /home/coder/go
ENV GOBIN $GOPATH/bin
ENV PATH $PATH:$GOBIN

# --- Deploy tools ---

# Install Terraform
RUN curl -fsSL https://apt.releases.hashicorp.com/gpg | apt-key add -
RUN apt-add-repository "deb [arch=amd64] https://apt.releases.hashicorp.com $(lsb_release -cs) main"
RUN apt-get update && sudo apt-get install terraform

# Install AWS CLI
RUN pip3 install awscli

# --- Backend / store-api ---
RUN apt-get install -y zstd 
RUN apt-get -y install postgresql postgresql-contrib

# Start temporary postgres server to make some changes during build process
# If you are building with sysbox, you can just leverage systemctl
USER postgres

RUN /usr/lib/postgresql/12/bin/pg_ctl -D /etc/postgresql/12/main/ start && \
    createuser -s postgres || true && \
    createdb bookstore_api && \
    sed -i 's/host    all             all             127.0.0.1\/32            md5/host    all             all             127.0.0.1\/32            trust/g' /etc/postgresql/12/main/pg_hba.conf && \
    /usr/lib/postgresql/12/bin/pg_ctl -D /etc/postgresql/12/main/ stop

# --- Frontend ---

# Disable auto-open of browser for frontend 
ENV BROWSER=none

# Install Node
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
RUN DEBIAN_FRONTEND="noninteractive" apt-get install -y nodejs

# Install Yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN DEBIAN_FRONTEND="noninteractive" apt-get update && apt-get install -y yarn

# Add global yarn packages
ENV PATH=$PATH:/home/coder/.yarn/bin
yarn global add @bazel/ibazel

# Scripts to run on workspace startup
COPY ./configure /coder/configure

USER coder