# Bash Command Reference Guide

## Introduction

### Terminal

A terminal is a text input and output environment. It is a way to interact with the shell and execute commands. When you open a terminal emulator (like GNOME Terminal, Konsole, or xterm), you are provided with a command-line interface where you can type and execute commands.

**What it does**: The terminal acts as a bridge between the user and the shell, allowing the user to input commands and view the output.

### Shell

A shell is a command-line interpreter that provides a user interface for Unix-like operating systems. It allows users to execute commands, run scripts, and manage system processes. Common shells include:

- **Bash (Bourne Again Shell)**
- **Zsh (Z Shell)**
- **Fish (Friendly Interactive Shell)**
- **Tcsh (TENEX C Shell)**

**What it does**: The shell interprets the commands entered by the user in the terminal and communicates with the operating system to execute those commands.

### Bash

Bash (Bourne Again Shell) is a widely-used Unix shell that is the default shell on many Linux distributions and macOS. It is an enhanced version of the original Bourne Shell (sh) and includes features from the Korn Shell (ksh) and C Shell (csh).

**What it does**: Bash provides a command-line interface for users to interact with the operating system. It supports scripting, command history, job control, and many other features that make it a powerful tool for system administration and automation.

### Differences Between Terminal, Shell, and Bash

- **Terminal**: A terminal is an interface that allows users to interact with the shell. It is essentially a window where you can type and execute commands.
- **Shell**: A shell is a program that interprets and executes the commands entered by the user in the terminal. It acts as an intermediary between the user and the operating system.
- **Bash**: Bash is a specific type of shell. It is one of the most popular and widely used shells, known for its powerful features and ease of use.

## File and Directory Operations

### `ls`

The `ls` command is used to list the contents of a directory.

| Flag | Description |
| ---- | ------------------------------------------------------- |
| `-l` | Use a long listing format |
| `-a` | Do not ignore entries starting with `.` |
| `-h` | Print sizes in human readable format (e.g., 1K 234M 2G) |
| `-R` | List subdirectories recursively |
| `-t` | Sort by modification time, newest first |
| `-S` | Sort by file size, largest first |

**Use Cases**:

- `ls -l`: List files in a long format, showing detailed information such as permissions, number of links, owner, group, size, and timestamp.
- `ls -a`: List all files, including hidden files (those starting with `.`).
- `ls -lh`: List files in a long format with human-readable file sizes.
- `ls -R`: List all files and directories recursively.
- `ls -lt`: List files sorted by modification time, newest first.
- `ls -lS`: List files sorted by size, largest first.
- `ls -lah`: List all files, including hidden ones, in a long format with human-readable sizes.

### `cd`

The `cd` command is used to change the current working directory.

| Flag | Description |
| ---- | ------------------------------ |
| `..` | Move to the parent directory |
| `-` | Move to the previous directory |

**Use Cases**:

- `cd ..`: Move up one directory level.
- `cd -`: Move to the previous directory.
- `cd /path/to/directory`: Change to a specific directory.

### `pwd`

The `pwd` command prints the current working directory.

| Flag | Description |
| ---- | ------------------------------------------------------------------- |
| `-L` | Print the value of `$PWD` if it names the current working directory |
| `-P` | Print the physical directory, without any symbolic links |

**Use Cases**:

- `pwd`: Print the current working directory.
- `pwd -P`: Print the physical directory path, without symbolic links.

### `mkdir`

The `mkdir` command is used to create directories.

| Flag | Description |
| ---- | ------------------------------------------------------- |
| `-p` | No error if existing, make parent directories as needed |
| `-v` | Print a message for each created directory |

**Use Cases**:

- `mkdir new_directory`: Create a new directory.
- `mkdir -p /path/to/directory`: Create a directory and its parent directories if they do not exist.
- `mkdir -v new_directory`: Create a new directory and print a message.

### `rmdir`

The `rmdir` command is used to remove empty directories.

| Flag | Description |
| ---- | ---------------------------------- |
| `-p` | Remove DIRECTORY and its ancestors |

**Use Cases**:

- `rmdir empty_directory`: Remove an empty directory.
- `rmdir -p /path/to/directory`: Remove a directory and its parent directories if they are empty.

### `cp`

The `cp` command is used to copy files and directories.

| Flag | Description |
| ---- | ---------------------------- |
| `-r` | Copy directories recursively |
| `-v` | Explain what is being done |
| `-i` | Prompt before overwrite |

**Use Cases**:

- `cp file1 file2`: Copy file1 to file2.
- `cp -r source_dir destination_dir`: Copy a directory and its contents.
- `cp -v file1 file2`: Copy file1 to file2 and explain what is being done.
- `cp -i file1 file2`: Copy file1 to file2 and prompt before overwriting.

### `mv`

The `mv` command is used to move or rename files and directories.

| Flag | Description |
| ---- | --------------------------------- |
| `-v` | Explain what is being done |
| `-i` | Prompt before overwrite |
| `-n` | Do not overwrite an existing file |

**Use Cases**:

- `mv old_name new_name`: Rename a file or directory.
- `mv file1 /path/to/directory`: Move a file to a different directory.
- `mv -v old_name new_name`: Rename a file and explain what is being done.
- `mv -i old_name new_name`: Rename a file and prompt before overwriting.
- `mv -n old_name new_name`: Rename a file without overwriting an existing file.

### `rm`

The `rm` command is used to remove files or directories.

| Flag | Description |
| ---- | ---------------------------------------------------- |
| `-r` | Remove directories and their contents recursively |
| `-f` | Ignore nonexistent files and arguments, never prompt |
| `-i` | Prompt before every removal |

**Use Cases**:

- `rm file`: Remove a file.
- `rm -r directory`: Remove a directory and its contents.
- `rm -f file`: Forcefully remove a file without prompting.
- `rm -i file`: Prompt before removing a file.
- `rm -rf /path/to/directory`: Forcefully remove a directory and its contents.

### `touch`

The `touch` command is used to create empty files or change file timestamps.

| Flag | Description |
| ---- | --------------------------------------------------- |
| `-a` | Change only the access time |
| `-m` | Change only the modification time |
| `-t` | Use `[[CC]YY]MMDDhhmm[.ss]` instead of current time |

**Use Cases**:

- `touch newfile.txt`: Create an empty file.
- `touch -a file.txt`: Change only the access time of a file.
- `touch -m file.txt`: Change only the modification time of a file.
- `touch -t 202301010101.01 file.txt`: Set a specific timestamp for a file.

## File Viewing and Editing

### `cat`

The `cat` command is used to concatenate and display file content.

| Flag | Description |
| ---- | ---------------------------- |
| `-n` | Number all output lines |
| `-b` | Number nonempty output lines |

**Use Cases**:

- `cat file.txt`: Display the content of a file.
- `cat -n file.txt`: Display a file with line numbers.
- `cat -b file.txt`: Display a file with line numbers for nonempty lines.

### `less`

The `less` command is used to view file content one screen at a time.

| Flag | Description |
| ---- | ----------------- |
| `-N` | Show line numbers |
| `-S` | Chop long lines |

**Use Cases**:

- `less file.txt`: View the content of a file.
- `less -N file.txt`: View a file with line numbers.
- `less -S file.txt`: View a file with long lines chopped.

### `head`

The `head` command is used to output the first part of files.

| Flag | Description |
| ---- | ------------------------- |
| `-n` | Print the first `n` lines |
| `-c` | Print the first `n` bytes |

**Use Cases**:

- `head file.txt`: Display the first 10 lines of a file.
- `head -n 5 file.txt`: Display the first 5 lines of a file.
- `head -c 100 file.txt`: Display the first 100 bytes of a file.

### `tail`

The `tail` command is used to output the last part of files.

| Flag | Description |
| ---- | -------------------------------------- |
| `-n` | Print the last `n` lines |
| `-f` | Output appended data as the file grows |

**Use Cases**:

- `tail file.txt`: Display the last 10 lines of a file.
- `tail -n 5 file.txt`: Display the last 5 lines of a file.
- `tail -f file.txt`: Continuously display appended data as the file grows.

### `grep`

The `grep` command is used to search text using patterns.

| Flag | Description |
| ---- | ------------------------------ |
| `-i` | Ignore case distinctions |
| `-r` | Recursively search directories |
| `-v` | Invert the sense of matching |

**Use Cases**:

- `grep "pattern" file.txt`: Search for a pattern in a file.
- `grep -i "pattern" file.txt`: Search for a pattern in a file, ignoring case.
- `grep -r "pattern" /path/to/directory`: Recursively search for a pattern in a directory.
- `grep -v "pattern" file.txt`: Search for lines that do not match the pattern.

### `sed`

The `sed` command is used to perform basic text transformations on an input stream (a file or input from a pipeline).

| Flag | Description |
| ---- | --------------------------------------------- |
| `-e` | Add the script to the commands to be executed |
| `-i` | Edit files in place |
| `-n` | Suppress automatic printing of pattern space |

**Use Cases**:

- `sed 's/old/new/' file.txt`: Replace the first occurrence of "old" with "new" in each line of a file.
- `sed -i 's/old/new/g' file.txt`: Replace all occurrences of "old" with "new" in a file.
- `sed -n 'p' file.txt`: Print only the lines that match the pattern.

### `awk`

The `awk` command is used for pattern scanning and processing language.

| Flag | Description |
| ---- | ----------------------------- |
| `-F` | Set the input field separator |
| `-v` | Assign a variable |

**Use Cases**:

- `awk '{print $1}' file.txt`: Print the first field of each line.
- `awk -F, '{print $1}' file.csv`: Print the first column of a CSV file.
- `awk -v var=value '{print var, $1}' file.txt`: Print a variable and the first field of each line.

## System Information

### `uname`

The `uname` command is used to print system information.

| Flag | Description |
| ---- | ------------------------ |
| `-a` | Print all information |
| `-r` | Print the kernel release |
| `-s` | Print the kernel name |

**Use Cases**:

- `uname`: Print the kernel name.
- `uname -a`: Print all system information.
- `uname -r`: Print the kernel release.

### `top`

The `top` command is used to display tasks and system status.

| Flag | Description |
| ---- | ------------------------------------- |
| `-u` | Display processes for a specific user |
| `-p` | Monitor specific PIDs |

**Use Cases**:

- `top`: Display all running processes.
- `top -u username`: Display processes for a specific user.
- `top -p PID`: Monitor a specific process by PID.

### `ps`

The `ps` command is used to report a snapshot of current processes.

| Flag | Description |
| ---- | ------------------------------------- |
| `-e` | Select all processes |
| `-f` | Full-format listing |
| `-u` | Display processes for a specific user |

**Use Cases**:

- `ps`: Display current processes.
- `ps -e`: Display all processes.
- `ps -f`: Display a full-format listing of processes.
- `ps -u username`: Display processes for a specific user.

### `df`

The `df` command is used to report file system disk space usage.

| Flag | Description |
| ---- | ------------------------------------------------------- |
| `-h` | Print sizes in human readable format (e.g., 1K 234M 2G) |
| `-T` | Print file system type |

**Use Cases**:

- `df`: Display disk space usage.
- `df -h`: Display disk space usage in human-readable format.
- `df -T`: Display file system type.

### `du`

The `du` command is used to estimate file space usage.

| Flag | Description |
| ---- | ------------------------------------------------------- |
| `-h` | Print sizes in human readable format (e.g., 1K 234M 2G) |
| `-s` | Display only a total for each argument |

**Use Cases**:

- `du`: Display disk usage of files and directories.
- `du -h`: Display disk usage in human-readable format.
- `du -sh /path/to/directory`: Display the total size of a directory.

### `free`

The `free` command is used to display memory usage.

| Flag | Description |
| ---- | ------------------------------------------------------- |
| `-h` | Print sizes in human readable format (e.g., 1K 234M 2G) |
| `-m` | Display memory in megabytes |

**Use Cases**:

- `free`: Display memory usage.
- `free -h`: Display memory usage in human-readable format.
- `free -m`: Display memory usage in megabytes.

## File Permissions

### `chmod`

The `chmod` command is used to change file modes or Access Control Lists.

| Flag | Description |
| ---- | -------------------------------------------- |
| `-R` | Change files and directories recursively |
| `-v` | Output a diagnostic for every file processed |

**Use Cases**:

- `chmod 755 file`: Set file permissions to 755.
- `chmod -R 755 /path/to/directory`: Set permissions recursively.
- `chmod -v 755 file`: Set file permissions and output a diagnostic.

### `chown`

The `chown` command is used to change file owner and group.

| Flag | Description |
| ---- | -------------------------------------------- |
| `-R` | Operate on files and directories recursively |
| `-v` | Output a diagnostic for every file processed |

**Use Cases**:

- `chown user file`: Change the owner of a file.
- `chown -R user:group /path/to/directory`: Change ownership recursively.
- `chown -v user file`: Change the owner of a file and output a diagnostic.

### `chgrp`

The `chgrp` command is used to change group ownership.

| Flag | Description |
| ---- | -------------------------------------------- |
| `-R` | Operate on files and directories recursively |
| `-v` | Output a diagnostic for every file processed |

**Use Cases**:

- `chgrp group file`: Change the group of a file.
- `chgrp -R group /path/to/directory`: Change group ownership recursively.
- `chgrp -v group file`: Change the group of a file and output a diagnostic.

## Networking

### `ping`

The `ping` command is used to send ICMP ECHO_REQUEST to network hosts.

| Flag | Description |
| ---- | --------------------------------------------------- |
| `-c` | Stop after sending `count` ECHO_REQUEST packets |
| `-i` | Wait `interval` seconds between sending each packet |

**Use Cases**:

- `ping google.com`: Send ping requests to google.com.
- `ping -c 4 google.com`: Send 4 ping requests to google.com.
- `ping -i 2 google.com`: Send ping requests to google.com with a 2-second interval.

### `ifconfig`

The `ifconfig` command is used to configure network interfaces.

| Flag | Description |
| ------ | ------------------------------------------------------------------ |
| `-a` | Display all interfaces which are currently available, even if down |
| `up` | Activate the interface |
| `down` | Deactivate the interface |

**Use Cases**:

- `ifconfig`: Display network interfaces.
- `ifconfig -a`: Display all network interfaces.
- `ifconfig eth0 up`: Activate the interface `eth0`.
- `ifconfig eth0 down`: Deactivate the interface `eth0`.

### `netstat`

The `netstat` command is used to print network connections, routing tables, interface statistics, masquerade connections, and multicast memberships.

| Flag | Description |
| ---- | ----------------------- |
| `-a` | Show all sockets |
| `-t` | Display TCP connections |
| `-u` | Display UDP connections |

**Use Cases**:

- `netstat`: Display network connections.
- `netstat -a`: Show all sockets.
- `netstat -t`: Display TCP connections.
- `netstat -u`: Display UDP connections.
- `netstat -tuln`: Display all listening TCP and UDP connections.

### `curl`

The `curl` command is used to transfer data from or to a server.

| Flag | Description |
| ---- | ----------------------------------------------- |
| `-O` | Write output to a file named as the remote file |
| `-L` | Follow redirects |
| `-I` | Fetch the headers only |

**Use Cases**:

- `curl http://example.com`: Fetch the content of a URL.
- `curl -O http://example.com/file.txt`: Download a file.
- `curl -L http://example.com`: Follow redirects.
- `curl -I http://example.com`: Fetch the headers only.

### `wget`

The `wget` command is used to retrieve files from the web.

| Flag | Description |
| ---- | ----------------------------------------------- |
| `-O` | Write output to a file named as the remote file |
| `-q` | Quiet (no output) |
| `-r` | Recursive download |

**Use Cases**:

- `wget http://example.com`: Download a file.
- `wget -O file.txt http://example.com/file.txt`: Download a file and save it with a specific name.
- `wget -q http://example.com`: Download a file quietly.
- `wget -r http://example.com`: Download a website recursively.

## Compression and Archiving

### `tar`

The `tar` command is used to create and manipulate tar archives.

| Flag | Description |
| ---- | ------------------------------ |
| `-c` | Create a new archive |
| `-x` | Extract files from an archive |
| `-v` | Verbosely list files processed |
| `-f` | Use archive file |

**Use Cases**:

- `tar -cvf archive.tar /path/to/directory`: Create an archive.
- `tar -xvf archive.tar`: Extract an archive.
- `tar -tvf archive.tar`: List the contents of an archive.

### `gzip`

The `gzip` command is used to compress files.

| Flag | Description |
| ---- | ------------------ |
| `-d` | Decompress |
| `-k` | Keep original file |

**Use Cases**:

- `gzip file.txt`: Compress a file.
- `gzip -d file.txt.gz`: Decompress a file.
- `gzip -k file.txt`: Compress a file and keep the original.

### `gunzip`

The `gunzip` command is used to decompress files.

| Flag | Description |
| ---- | ------------------ |
| `-k` | Keep original file |

**Use Cases**:

- `gunzip file.txt.gz`: Decompress a file.
- `gunzip -k file.txt.gz`: Decompress a file and keep the original.

### `zip`

The `zip` command is used to package and compress files.

| Flag | Description |
| ---- | --------------------------- |
| `-r` | Recursively zip directories |
| `-q` | Quiet mode |

**Use Cases**:

- `zip archive.zip file1 file2`: Create a zip archive containing multiple files.
- `zip -r archive.zip /path/to/directory`: Create a zip archive of a directory.
- `zip -q archive.zip file1 file2`: Create a zip archive quietly.

### `unzip`

The `unzip` command is used to extract compressed files from a zip archive.

| Flag | Description |
| ---- | --------------------------------------- |
| `-l` | List contents of a zip file |
| `-d` | Extract files into a specific directory |

**Use Cases**:

- `unzip archive.zip`: Extract a zip archive.
- `unzip -l archive.zip`: List the contents of a zip archive.
- `unzip archive.zip -d /path/to/directory`: Extract a zip archive into a specific directory.

## Package Management (varies by distribution)

### `apt-get` (Debian/Ubuntu)

The `apt-get` command is used to handle packages in Debian-based systems.

| Command | Description |
| --------- | -------------------- |
| `update` | Update package lists |
| `upgrade` | Upgrade all packages |
| `install` | Install a package |

**Use Cases**:

- `apt-get update`: Update package lists.
- `apt-get upgrade`: Upgrade all packages.
- `apt-get install package_name`: Install a package.

### `yum` (CentOS/RHEL)

The `yum` command is used to manage packages in RPM-based systems.

| Command | Description |
| --------- | ----------------- |
| `install` | Install a package |
| `update` | Update a package |
| `remove` | Remove a package |

**Use Cases**:

- `yum install package_name`: Install a package.
- `yum update package_name`: Update a package.
- `yum remove package_name`: Remove a package.

### `dnf` (Fedora)

The `dnf` command is used to manage packages in Fedora systems.

| Command | Description |
| --------- | ----------------- |
| `install` | Install a package |
| `update` | Update a package |
| `remove` | Remove a package |

**Use Cases**:

- `dnf install package_name`: Install a package.
- `dnf update package_name`: Update a package.
- `dnf remove package_name`: Remove a package.

### `pacman` (Arch Linux)

The `pacman` command is used to manage packages in Arch Linux systems.

| Command | Description |
| ------- | ----------------- |
| `-S` | Install a package |
| `-R` | Remove a package |
| `-U` | Upgrade a package |

**Use Cases**:

- `pacman -S package_name`: Install a package.
- `pacman -R package_name`: Remove a package.
- `pacman -U package_name`: Upgrade a package.

## Miscellaneous

### `echo`

The `echo` command is used to display a line of text.

| Flag | Description |
| ---- | ------------------------------------------ |
| `-n` | Do not output the trailing newline |
| `-e` | Enable interpretation of backslash escapes |

**Use Cases**:

- `echo "Hello, World!"`: Print a line of text.
- `echo -n "Hello, World!"`: Print a line of text without a trailing newline.
- `echo -e "Hello\nWorld"`: Print "Hello" and "World" on separate lines.

### `date`

The `date` command is used to display or set the system date and time.

| Flag | Description |
| --------- | ------------------------------------------- |
| `+FORMAT` | Display the date using the specified format |
| `-s` | Set the date and time |

**Use Cases**:

- `date`: Display the current date and time.
- `date +%Y-%m-%d`: Display the current date in YYYY-MM-DD format.
- `date -s "2023-01-01 12:34:56"`: Set the system date and time.

### `whoami`

The `whoami` command is used to print the current user ID and name.

- No flags

**Use Cases**:

- `whoami`: Print the current user ID and name.

### `man`

The `man` command is used to display the manual pages for commands.

| Flag | Description |
| ---- | --------------------------------------------- |
| `-k` | Search the manual page names and descriptions |
| `-f` | Display a short description of the command |

**Use Cases**:

- `man ls`: Display the manual page for the `ls` command.
- `man -k keyword`: Search for a keyword in the manual pages.
- `man -f command`: Display a short description of the command.

### `history`

The `history` command is used to display or manipulate the command history.

| Flag | Description |
| ---- | --------------------------------------------- |
| `-c` | Clear the history list |
| `-d` | Delete the history entry at position `offset` |

**Use Cases**:

- `history`: Display the command history.
- `history -c`: Clear the command history.
- `history -d 10`: Delete the 10th entry in the command history.

### `alias`

The `alias` command is used to create an alias for a command.

- No flags

**Use Cases**:

- `alias ll='ls -lah'`: Create an alias for a command.
- `alias gs='git status'`: Create an alias for a Git command.

### `unalias`

The `unalias` command is used to remove an alias.

| Flag | Description |
| ---- | ------------------ |
| `-a` | Remove all aliases |

**Use Cases**:

- `unalias ll`: Remove a specific alias.
- `unalias -a`: Remove all aliases.