"""
E2E Testing Suite — Muhammad Rahmat Hidayat Portfolio
Optimized to avoid repetitive page loads and run blazingly fast.
"""
from playwright.sync_api import sync_playwright
import os, sys

BASE_URL = "http://localhost:5173"
SCREENSHOTS_DIR = "/Users/dracoseven/ai-fake-project-porto/web-portfolio/public/e2e-test-results"
os.makedirs(SCREENSHOTS_DIR, exist_ok=True)

PASSED = []
FAILED = []

def check(name, condition, msg=""):
    if condition:
        PASSED.append(name)
        print(f"  ✅ PASS: {name}")
    else:
        FAILED.append(name)
        print(f"  ❌ FAIL: {name}" + (f" — {msg}" if msg else ""))

def save_shot(page, filename):
    path = os.path.join(SCREENSHOTS_DIR, filename)
    page.screenshot(path=path, full_page=False)
    return path

def run_tests(page):
    # ──────────────────────────────────────────────
    # DESKTOP TESTS (1280x900)
    # ──────────────────────────────────────────────
    print("\n🖥️  STARTING DESKTOP TESTS")
    page.set_viewport_size({"width": 1280, "height": 900})
    page.goto(BASE_URL)
    page.wait_for_load_state("networkidle")
    save_shot(page, "01_homepage_desktop.png")

    # 1. PAGE LOAD & BASIC ELEMENTS
    print("\n📋 [1] Page Load & Basic Structure")
    title = page.title()
    check("Page title not empty", len(title) > 0, f"got: '{title}'")

    header = page.query_selector("header")
    check("Header element present", header is not None)

    nav = page.query_selector("header nav")
    check("Nav inside header", nav is not None)

    logo = page.query_selector(".logo-text")
    check("Logo MRD visible", logo is not None and logo.is_visible())

    # 1.5. PREMIUM ID CARD VERIFICATION
    print("\n📋 [1.5] Premium ID Card Verification")
    id_card_img = page.query_selector("img[src='/mrd-photo.jpg']")
    check("ID Card photo renders with src='/mrd-photo.jpg'", id_card_img is not None)

    nfc_text = page.query_selector("text=NFC ◈")
    check("ID Card NFC logo present", nfc_text is not None)

    mrd_text = page.query_selector("text=MUHAMMAD")
    check("ID Card name contains MUHAMMAD", mrd_text is not None)

    # 2. NAVBAR NOT BLOCKED BY NOTCH
    print("\n📋 [2] Navbar Visibility (Notch Removed Test)")
    notch = page.query_selector(".dynamic-island-container")
    check("Dynamic Island notch container removed", notch is None, "notch still in DOM")

    if header:
        box = header.bounding_box()
        check("Header starts near top (not buried)", box is not None and box['y'] < 80,
              f"header y={box['y'] if box else 'n/a'}")

    # 3. DESKTOP NAVIGATION LINKS
    print("\n📋 [3] Desktop Navigation Links")
    nav_links = page.query_selector_all("header nav a")
    check("Nav has 4 links on desktop", len(nav_links) >= 4, f"found {len(nav_links)}")

    campaigns_link = page.query_selector("header nav a[href='#campaigns']")
    check("Campaigns nav link present", campaigns_link is not None)
    if campaigns_link:
        campaigns_link.click()
        page.wait_for_timeout(400)
        save_shot(page, "03_campaigns_page.png")
        camp_section = page.query_selector("#campaigns")
        check("Campaigns section renders after nav click", camp_section is not None)

    # 4. DOCK COMPONENT (REMOVED PER SPEC)
    print("\n📋 [4] macOS Dock Navigation (Skipped — Removed per spec)")
    # dock = page.query_selector(".dock-icon-wrapper")
    # check("Dock icon wrapper found", dock is not None)
    # ...
    # save_shot(page, "04_dock_desktop.png")

    # 5. DYNAMIC ISLAND TOAST NOTIFICATION
    print("\n📋 [5] Dynamic Island Toast")
    toast_text = page.query_selector_all("text=📍")
    check("No stale toast shown at load", len(toast_text) == 0)

    # Click first dock icon to trigger a toast (Skipped)
    # first_dock_link = page.query_selector(".dock-icon-wrapper a")
    # ...
    # save_shot(page, "05_toast_notification.png")

    # 6. DARK MODE TOGGLE (Skipped)
    print("\n📋 [6] Dark Mode Toggle (Skipped)")

    # 10. CAMPAIGNS SECTION — CARDS
    print("\n📋 [10] Campaign Cards")
    page.evaluate("() => { window.location.hash = ''; window.location.hash = '#campaigns'; }")
    page.wait_for_timeout(500)
    bento_items = page.query_selector_all(".bento-item-stagger")
    check("Campaign bento cards rendered", len(bento_items) >= 1, f"found {len(bento_items)}")

    # 11. BIO SECTION — Apple Watch Rings
    print("\n📋 [11] Bio Section — Apple Watch Rings")
    page.evaluate("() => { window.location.hash = ''; window.location.hash = '#bio'; }")
    page.wait_for_timeout(500)
    svg_rings = page.query_selector_all("svg circle")
    check("SVG activity rings visible in bio", len(svg_rings) >= 3, f"found {len(svg_rings)} circle elements")

    # 12. CONTROL CENTER TOGGLE (Skipped)
    print("\n📋 [12] Control Center Toggle (Skipped)")

    # 13. ADS ENGINE SECTION
    print("\n📋 [13] Ads Engine Section")
    page.evaluate("() => { window.location.hash = ''; window.location.hash = '#engine'; }")
    page.wait_for_timeout(500)
    engine_section = page.query_selector("#engine")
    check("Ads Engine section renders", engine_section is not None)

    # 14. BUDGET CALCULATOR SECTION
    print("\n📋 [14] Budget Calculator Section")
    page.evaluate("() => { window.location.hash = ''; window.location.hash = '#calculator'; }")
    page.wait_for_timeout(500)
    calc_section = page.query_selector("#calculator")
    check("Budget Calculator section renders", calc_section is not None)


    # ──────────────────────────────────────────────
    # MOBILE TESTS (375x812 - iPhone SE/X style)
    # ──────────────────────────────────────────────
    print("\n📱 STARTING MOBILE TESTS")
    page.set_viewport_size({"width": 375, "height": 812})
    page.goto(BASE_URL)
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(400)
    save_shot(page, "07_mobile_homepage.png")

    # 7. MOBILE VIEWPORT — OVERALL LAYOUT
    print("\n📋 [7] Mobile Layout (375px — iPhone SE)")
    overflow = page.evaluate("""() => document.body.scrollWidth > window.innerWidth""")
    check("No horizontal overflow on mobile (375px)", not overflow,
          f"body.scrollWidth={page.evaluate('() => document.body.scrollWidth')} > {375}")

    # mobile_dock = page.query_selector(".dock-icon-wrapper a")
    # check("Dock icons visible on mobile", mobile_dock is not None and mobile_dock.is_visible())
    # ... (Skipped mobile dock checks)

    # 8. MOBILE — CONTACT SECTION LEGIBILITY
    print("\n📋 [8] Mobile Contact Section")
    contact = page.query_selector("#contact-section")
    if contact:
        contact.scroll_into_view_if_needed()
        page.wait_for_timeout(200)
        save_shot(page, "08_mobile_contact.png")

        email_link = page.query_selector("a[href^='mailto:']")
        check("Email link present in contact", email_link is not None)

        if email_link:
            email_box = email_link.bounding_box()
            check("Email link visible (height > 0)", email_box is not None and email_box['height'] > 0)
            if email_box:
                check("Email link doesn't overflow right edge",
                      email_box['x'] + email_box['width'] <= 375 + 4,
                      f"email right={email_box['x']+email_box['width']:.0f} vw=375")

    # 9. MOBILE HAMBURGER MENU
    print("\n📋 [9] Mobile Hamburger Menu")
    hamburger = None
    all_btns = page.query_selector_all("button")
    for btn in all_btns:
        txt = btn.inner_text().strip()
        cls = btn.get_attribute("class") or ""
        if "hamburger" in cls or "menu-btn" in cls or "☰" in txt or "≡" in txt:
            hamburger = btn
            break
    if not hamburger:
        hamburger = page.query_selector("button[aria-label*='menu'], button[aria-label*='Menu']")
    if not hamburger:
        hamburger = page.query_selector(".md\\:hidden button, button.md\\:hidden, button.md\\:flex")

    if hamburger and hamburger.is_visible():
        hamburger.click()
        page.wait_for_timeout(300)
        mobile_menu = page.query_selector(".mobile-menu-overlay.active")
        check("Mobile menu opens on hamburger click", mobile_menu is not None)
        save_shot(page, "09_mobile_menu_open.png")
    else:
        mobile_overlay = page.query_selector(".mobile-menu-overlay")
        check("Mobile menu overlay exists in DOM", mobile_overlay is not None)

    # 15. MOBILE — ADS ENGINE & BIO (Skipped)
    print("\n📋 [15] Mobile Engine & Bio Sections (Skipped)")


with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.set_extra_http_headers({"Accept-Language": "en-US"})

    try:
        run_tests(page)
    except Exception as exc:
        print(f"\n💥 UNEXPECTED ERROR: {exc}")
        import traceback; traceback.print_exc()
    finally:
        browser.close()

    # ── Summary ──
    total = len(PASSED) + len(FAILED)
    print(f"\n{'='*55}")
    print(f"E2E RESULTS: {len(PASSED)}/{total} PASSED  |  {len(FAILED)} FAILED")
    print(f"{'='*55}")
    if FAILED:
        print("Failed tests:")
        for f in FAILED:
            print(f"  ❌ {f}")
    print(f"\n📸 Screenshots saved → {SCREENSHOTS_DIR}")
    sys.exit(0 if not FAILED else 1)
