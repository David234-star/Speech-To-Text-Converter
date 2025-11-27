import deepgram.listen.v1.media
import inspect

print("\nListing attributes of the deepgram.listen.v1.media module:")
for name in dir(deepgram.listen.v1.media):
    if not name.startswith('__'): # Exclude built-in attributes
        attr = getattr(deepgram.listen.v1.media, name)
        if inspect.ismodule(attr):
            print(f"  Module: deepgram.listen.v1.media.{name}")
        else:
            print(f"  Attribute: deepgram.listen.v1.media.{name}")


