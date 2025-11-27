import deepgram.listen.v1
import inspect

print("\nListing attributes of the deepgram.listen.v1 module:")
for name in dir(deepgram.listen.v1):
    if not name.startswith('__'): # Exclude built-in attributes
        attr = getattr(deepgram.listen.v1, name)
        if inspect.ismodule(attr):
            print(f"  Module: deepgram.listen.v1.{name}")
        else:
            print(f"  Attribute: deepgram.listen.v1.{name}")

