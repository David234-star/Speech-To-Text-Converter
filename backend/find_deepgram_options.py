import deepgram
import inspect

try:
    # Attempt to access PrerecordedOptions and LiveOptions directly
    _ = deepgram.PrerecordedOptions
    _ = deepgram.LiveOptions
    print("PrerecordedOptions and LiveOptions are directly available in deepgram.")
except AttributeError:
    print("PrerecordedOptions or LiveOptions are NOT directly available in deepgram.")
    print("\nListing attributes of the deepgram module:")
    for name in dir(deepgram):
        if not name.startswith('__'): # Exclude built-in attributes
            attr = getattr(deepgram, name)
            if inspect.ismodule(attr):
                print(f"  Module: deepgram.{name}")
                # Optionally, list attributes of submodules if they seem relevant
                # For now, just list the module itself
            else:
                print(f"  Attribute: deepgram.{name}")
