#!/usr/bin/env -S accelerate launch --num_processes=12 --num_machines=1 --mixed_precision=no --dynamo_backend=no --
import argparse
import os

os.environ["ONEFLOW_NNGRAPH_ENABLE_PROGRESS_BAR"] = "1"
import oneflow as flow

flow.mock_torch.enable()
from onediff import OneFlowStableDiffusionPipeline

pipe = OneFlowStableDiffusionPipeline.from_pretrained(
    "CompVis/stable-diffusion-v1-4",
    use_auth_token=True,
    revision="fp16",
    torch_dtype=flow.float16,
)

pipe = pipe.to("cuda")


def parse_args():
    parser = argparse.ArgumentParser(description="Simple demo of image generation.")
    parser.add_argument(
        "--prompt", type=str, default="a photo of an astronaut riding a horse on mars"
    )
    parser.add_argument(
        "--output_dir", type=str, default="outputs",
    )
    parser.add_argument(
        "-n", type=int, default=1,
    )
    return parser.parse_args()


args = parse_args()
os.makedirs(args.output_dir, exist_ok=True)

with flow.autocast("cuda"):
    for n in range(args.n):
        images = pipe(args.prompt).images
        for i, image in enumerate(images):
            dst = os.path.join(args.output_dir, f"{args.prompt[:100]}-{n}-{i}.png")
            image.save(dst)
