import deepgram.listen.v1.prerecorded
import inspect

print("\nListing attributes of the deepgram.listen.v1.prerecorded module:")
for name in dir(deepgram.listen.v1.prerecorded):
    if not name.startswith('__'): # Exclude built-in attributes
        attr = getattr(deepgram.listen.v1.prerecorded, name)
        if inspect.ismodule(attr):
            print(f"  Module: deepgram.listen.v1.prerecorded.{name}")
        else:
            print(f"  Attribute: deepgram.listen.v1.prerecorded.{name}")

