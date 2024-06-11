JAVAC = javac
JAR = jar
JAVA = java
SRC_DIR = hemlo
CLASS_DIR = $(SRC_DIR)
JAR_FILE = hemlo.jar
MAIN_CLASS = hemlo.Hello

.PHONY: all compile jar run clean

all: compile jar run

compile: $(SRC_DIR)/Hello.java
	$(JAVAC) $(SRC_DIR)/Hello.java

jar: $(JAR_FILE)

$(JAR_FILE): $(CLASS_DIR)/Hello.class
	# 2.1 alternative:
	# $(JAR) --create --file hemlo.jar --main-class="hemlo" $<
	$(JAR) cf $(JAR_FILE) $<

run:
	# 2.2 alternative:
	# $(JAVA) -jar $(JAR_FILE)
	$(JAVA) -cp $(JAR_FILE) $(MAIN_CLASS)

clean:
	rm -vf $(CLASS_DIR)/Hello.class $(JAR_FILE)
