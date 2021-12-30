SUBDIRS := $(shell find */ -name Makefile -printf "%h\n")

all: $(SUBDIRS)
$(SUBDIRS):
	"$(MAKE)" -C "$@" push

.PHONY: all $(SUBDIRS)
