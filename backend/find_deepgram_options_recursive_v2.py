import deepgram
import inspect
import pkgutil
import sys

def find_deepgram_options_recursive(module, current_path="deepgram"):
    # Check current module's attributes
    for name in dir(module):
        if name.startswith('__'):
            continue
        attr = getattr(module, name)
        if inspect.isclass(attr):
            if name == "PrerecordedOptions" or name == "LiveOptions":
                print(f"Found {name} at: {current_path}.{name}")

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
            find_deepgram_options_recursive(submodule, full_submodule_name)

print("Searching for PrerecordedOptions and LiveOptions within deepgram package...")
find_deepgram_options_recursive(deepgram)
