import deepgram
import inspect
import pkgutil
import sys

def find_deepgram_events_recursive(module, current_path="deepgram"):
    # Check current module's attributes
    for name in dir(module):
        if name.startswith('__'):
            continue
        attr = getattr(module, name)
        full_attr_path = f"{current_path}.{name}" # Corrected: define full_attr_path here

        if inspect.isclass(attr):
            if name == "LiveTranscriptionEvents":
                print(f"Found {name} at: {full_attr_path}")
        elif inspect.ismodule(attr):
            # Check if it's a submodule of deepgram
            if full_attr_path.startswith("deepgram") and hasattr(attr, '__path__'): # Use full_attr_path
                find_deepgram_events_recursive(attr, full_attr_path)

    # Recursively search submodules
    if hasattr(module, '__path__'):
        for _, subname, ispkg in pkgutil.iter_modules(module.__path__):
            full_submodule_name = f"{current_path}.{subname}"
            try:
                submodule = sys.modules[full_submodule_name]
            except KeyError:
                # If not already imported, import it
                try:
                    submodule = __import__(full_submodule_name, fromlist=[''])
                except ImportError:
                    continue
            find_deepgram_events_recursive(submodule, full_submodule_name)

print("Searching for LiveTranscriptionEvents within deepgram package...")
find_deepgram_events_recursive(deepgram)