import deepgram
import inspect
import pkgutil

def find_deepgram_options(module, current_path="deepgram"):
    for name in dir(module):
        if name.startswith('__'):
            continue

        attr = getattr(module, name)
        full_path = f"{current_path}.{name}"

        if inspect.isclass(attr):
            if name == "PrerecordedOptions" or name == "LiveOptions":
                print(f"Found {name} at: {full_path}")
        elif inspect.ismodule(attr):
            # Check if it's a submodule of deepgram
            if full_path.startswith("deepgram") and hasattr(attr, '__path__'):
                find_deepgram_options(attr, full_path)

print("Searching for PrerecordedOptions and LiveOptions within deepgram package...")
find_deepgram_options(deepgram)
