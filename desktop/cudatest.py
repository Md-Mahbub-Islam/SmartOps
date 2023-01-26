import torch
print(f"Cuda available P {torch.cuda.is_available()}")
print(f"Cuda device count {torch.cuda.device_count()}")
print(f"Current device {torch.cuda.current_device()}")
print(f"Device name {torch.cuda.get_device_name(0)}")