from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ICON_PATH = Path("public/brand/keb-news-icon.png")
LOGO_PATH = Path("public/brand/keb-news-logo.png")
FAVICON_PATH = Path("src/app/favicon.ico")

ICON_CANVAS = 512
UPSCALE = 4

PAGE_BACKGROUND = "#f7f6f1"
TEXT_PRIMARY = "#2b2e33"
TEXT_SECONDARY = "#6a6e74"
ICON_TILE = "#7e8289"
ICON_INK = "#f5f4ef"

SERIF_BOLD = "/System/Library/Fonts/Supplemental/Georgia Bold.ttf"
SERIF_REGULAR = "/System/Library/Fonts/Supplemental/Georgia.ttf"


def draw_icon(size: int = ICON_CANVAS) -> Image.Image:
    canvas_size = size * UPSCALE
    image = Image.new("RGBA", (canvas_size, canvas_size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(image)

    def scale(value: int) -> int:
        return value * UPSCALE

    draw.rounded_rectangle(
        (scale(36), scale(36), scale(476), scale(476)),
        radius=scale(72),
        fill=ICON_TILE,
    )
    draw.rounded_rectangle(
        (scale(114), scale(108), scale(176), scale(404)),
        radius=scale(31),
        fill=ICON_INK,
    )
    draw.line(
        (scale(166), scale(256), scale(352), scale(112)),
        fill=ICON_INK,
        width=scale(70),
    )
    draw.line(
        (scale(166), scale(256), scale(352), scale(400)),
        fill=ICON_INK,
        width=scale(70),
    )

    for x, y in ((166, 256), (352, 112), (352, 400)):
        radius = scale(35)
        draw.ellipse(
            (scale(x) - radius, scale(y) - radius, scale(x) + radius, scale(y) + radius),
            fill=ICON_INK,
        )

    return image.resize((size, size), Image.Resampling.LANCZOS)


def load_font(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size=size)


def draw_banner(icon: Image.Image) -> Image.Image:
    width = 1536
    height = 1024
    banner = Image.new("RGBA", (width, height), PAGE_BACKGROUND)
    draw = ImageDraw.Draw(banner)

    icon_size = 272
    icon_x = 188
    icon_y = (height - icon_size) // 2
    banner.alpha_composite(icon.resize((icon_size, icon_size), Image.Resampling.LANCZOS), (icon_x, icon_y))

    eyebrow_font = load_font(SERIF_REGULAR, 34)
    title_font = load_font(SERIF_BOLD, 150)
    deck_font = load_font(SERIF_REGULAR, 52)

    text_x = 520
    draw.text((text_x, 286), "AI and tech newsroom", fill=TEXT_SECONDARY, font=eyebrow_font)
    draw.text((text_x, 346), "KEB News", fill=TEXT_PRIMARY, font=title_font)
    draw.text((text_x, 546), "Original editorial briefings for AI and tech.", fill=TEXT_SECONDARY, font=deck_font)

    return banner


def save_favicon(icon: Image.Image) -> None:
    FAVICON_PATH.parent.mkdir(parents=True, exist_ok=True)
    icon.save(FAVICON_PATH, format="ICO", sizes=[(64, 64), (32, 32), (16, 16)])


def main() -> None:
    icon = draw_icon()
    ICON_PATH.parent.mkdir(parents=True, exist_ok=True)
    icon.save(ICON_PATH)
    draw_banner(icon).save(LOGO_PATH)
    save_favicon(icon)


if __name__ == "__main__":
    main()
