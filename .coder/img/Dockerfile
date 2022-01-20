# See our guides for writing custom images:
# https://coder.com/docs/guides/customization

FROM codercom/enterprise-base:ubuntu

# Install programs
RUN apt-get update && apt-get install -y apt-transport-https curl software-properties-common git gcc gnupg2 g++ default-jdk python-dev zip wget vim
RUN wget https://github.com/bazelbuild/bazel/releases/download/4.1.0/bazel-4.1.0-installer-linux-x86_64.sh -O ./bazel-installer.sh && chmod 755 ./bazel-installer.sh
RUN ./bazel-installer.sh