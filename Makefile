SUBDIRS := $(shell find */ -name Makefile -printf "%h\n")

all: $(SUBDIRS)
$(SUBDIRS):
	"$(MAKE)" -C "$@" build

.PHONY: all $(SUBDIRS)
