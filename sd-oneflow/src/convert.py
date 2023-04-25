from diffusers import StableDiffusionPipeline

pipeline = StableDiffusionPipeline.from_ckpt(
    "./models/Stable-diffusion/some_model.safetensors",
    local_files_only=True
)

pipeline.save_pretrained('outputs/rev')
