from django.core.exceptions import ValidationError

def validate_file_size(file):
    max_size_kb = 50000

    if file.size > max_size_kb * 1024:
        raise ValidationError(f'file cannot be larger than {max_size_kb}KB!')