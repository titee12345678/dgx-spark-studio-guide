#!/usr/bin/env python3
from pathlib import Path
from PIL import Image

SRC = Path("/home/dgxspark/ai/studio-guide/assets/shots")
OUT = SRC / "focus"
OUT.mkdir(exist_ok=True)

# (src, left, top, right, bottom, dest)
CROPS = [
    ("comfy-home.png", 70, 70, 540, 720, "comfy-red-nodes.png"),
    ("comfy-home.png", 760, 6, 1588, 72, "comfy-runbar.png"),
    ("comfy-home.png", 1160, 68, 1588, 220, "comfy-errors-toast.png"),
    ("comfy-home.png", 700, 250, 1100, 740, "comfy-ksampler-node.png"),
    ("comfy-home.png", 0, 40, 72, 430, "comfy-rail.png"),
    ("comfy-models.png", 48, 0, 400, 780, "comfy-model-folders.png"),
    ("comfy-nodes.png", 48, 0, 400, 780, "comfy-node-list.png"),
    ("comfy-templates-image.png", 190, 70, 1410, 900, "comfy-tpl-image.png"),
    ("comfy-templates-image.png", 430, 155, 900, 530, "comfy-tpl-zimage.png"),
    ("comfy-templates-video.png", 190, 70, 1410, 900, "comfy-tpl-video.png"),
    ("comfy-templates-video.png", 200, 250, 430, 560, "comfy-tpl-video-tab.png"),
    ("comfy-clip-prompt.png", 1218, 36, 1594, 540, "comfy-prompt-panel.png"),
    ("comfy-clip-prompt.png", 400, 250, 820, 560, "comfy-prompt-node.png"),
    ("comfy-missing-details.png", 1218, 36, 1596, 720, "comfy-missing-panel.png"),
    ("comfy-guide-run.png", 268, 48, 560, 470, "comfy-graph-menu.png"),
    ("comfy-guide-run.png", 760, 6, 1588, 80, "comfy-runbar-errors.png"),
    ("comfy-latent.png", 1218, 36, 1594, 620, "comfy-size-panel.png"),
    ("comfy-ksampler.png", 700, 220, 1120, 760, "comfy-sampler-focus.png"),
    ("comfy-assets.png", 48, 0, 430, 520, "comfy-assets-empty.png"),
    ("comfy-guide-manager.png", 280, 80, 1320, 860, "comfy-manager-modal.png"),
    ("comfy-node-manager.png", 220, 60, 1380, 880, "comfy-nodes-installed.png"),
    ("comfy-guide-search.png", 480, 220, 1120, 720, "comfy-add-node.png"),
    ("comfy-guide-ksampler.png", 480, 180, 1180, 780, "comfy-search-ksampler.png"),
    ("comfy-guide-shortcuts.png", 200, 520, 1400, 980, "comfy-shortcuts.png"),
    ("webui-qwen35-home.png", 360, 250, 1240, 700, "webui-center.png"),
    ("webui-qwen35-picker.png", 700, 420, 1100, 690, "webui-picker.png"),
    ("webui-qwen35-picker.png", 360, 250, 1240, 720, "webui-picker-wide.png"),
    ("hermes-home-now.png", 0, 0, 260, 900, "hermes-menu.png"),
    ("hermes-home-now.png", 260, 70, 1580, 620, "hermes-sessions.png"),
    ("hermes-chat-now.png", 260, 80, 1580, 900, "hermes-chat-focus.png"),
]

for src, l, t, r, b, dest in CROPS:
    im = Image.open(SRC / src)
    w, h = im.size
    box = (max(0, l), max(0, t), min(w, r), min(h, b))
    crop = im.crop(box)
    crop.save(OUT / dest, optimize=True)
    print(f"{dest:28} {crop.size[0]}x{crop.size[1]} from {src}")
