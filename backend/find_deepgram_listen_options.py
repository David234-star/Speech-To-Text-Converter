import deepgram.listen
import inspect

try:
    # Attempt to access PrerecordedOptions and LiveOptions directly from deepgram.listen
    _ = deepgram.listen.PrerecordedOptions
    _ = deepgram.listen.LiveOptions
    print("PrerecordedOptions and LiveOptions are directly available in deepgram.listen.")
except AttributeError:
    print("PrerecordedOptions or LiveOptions are NOT directly available in deepgram.listen.")
    print("\nListing attributes of the deepgram.listen module:")
    for name in dir(deepgram.listen):
        if not name.startswith('__'): # Exclude built-in attributes
            attr = getattr(deepgram.listen, name)
            if inspect.ismodule(attr):
                print(f"  Module: deepgram.listen.{name}")
            else:
                print(f"  Attribute: deepgram.listen.{name}")
