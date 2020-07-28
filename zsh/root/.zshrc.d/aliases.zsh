alias ls='\ls --color=auto'
alias ll='ls -lAhtrF'
alias grep='\grep --color=auto --perl-regexp'
alias grepr='grep --dereference-recursive'

dcp() {
  # print a command to copy files out of this docker container
  if [ "$#" -eq 1 ]; then
    printf "docker cp %q .\n" "$(hostname):$(readlink -e "$1")"
  else
    printf "docker exec %q tar czC %q" "$(hostname)" "$PWD"
    if [ "$#" -eq 0 ]; then
      # FIXME: this will create a "." in the archive; maybe go up one level?
      printf " ."
    else
      printf " %q" "$@"
    fi
    printf " | tar xzvC .\n"
  fi
}
