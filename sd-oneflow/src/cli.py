#!/usr/bin/env -S accelerate launch --num_processes=12 --num_machines=1 --mixed_precision=no --dynamo_backend=no --
import argparse
import os

os.environ["ONEFLOW_NNGRAPH_ENABLE_PROGRESS_BAR"] = "1"
import oneflow as flow

flow.mock_torch.enable()
from onediff import OneFlowStableDiffusionPipeline

generator = flow.Generator(device='cuda')
generator.manual_seed(1337)

def null_safety_checker(images, **kwargs):
    return images, False

pipe = OneFlowStableDiffusionPipeline.from_pretrained(
    "./outputs/rev/",
    # use_auth_token=True,
    # revision="fp16",
    # torch_dtype=flow.float16,
    requires_safety_checker=False,
    safety_checker=null_safety_checker,
)

pipe = pipe.to("cuda")


# pipe.safety_checker = dummy

def parse_args():
    parser = argparse.ArgumentParser(description="Simple demo of image generation.")
    parser.add_argument(
        "--prompt", type=str, default="a photo of an astronaut riding a horse on mars"
    )
    parser.add_argument(
        "--output_dir", type=str, default="outputs",
    )
    parser.add_argument(
        "-n", type=int, default=3,
    )
    return parser.parse_args()


args = parse_args()
# os.makedirs(args.output_dir, exist_ok=True)

with flow.autocast("cuda"):
    for n in range(args.n):
        # https://huggingface.co/docs/diffusers/main/en/api/pipelines/stable_diffusion/text2img#diffusers.StableDiffusionPipeline.__call__
        images = pipe(args.prompt, generator=generator).images
        for i, image in enumerate(images):
            dst = os.path.join(args.output_dir, f"{args.prompt[:100]}-{n}-{i}.png")
            image.save(dst)
