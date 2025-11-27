import deepgram.listen
import inspect
import sys
import pkgutil

def find_events_in_module(module, current_path="deepgram.listen"):
    for name in dir(module):
        if name.startswith('__'):
            continue
        attr = getattr(module, name)
        full_attr_path = f"{current_path}.{name}"

        if inspect.isclass(attr):
            if name == "LiveTranscriptionEvents":
                print(f"Found {name} at: {full_attr_path}")
        elif inspect.ismodule(attr):
            # Recursively search submodules
            if hasattr(attr, '__path__'):
                find_events_in_module(attr, full_attr_path)

print("Searching for LiveTranscriptionEvents within deepgram.listen package...")
find_events_in_module(deepgram.listen)
