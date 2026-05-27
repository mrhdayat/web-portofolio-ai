import subprocess
import time
import os
import sys
from playwright.sync_api import sync_playwright

def run_screenshot():
    # 1. Start the Vite dev server as a subprocess
    print("Starting Vite development server...")
    server_process = subprocess.Popen(
        ["npm", "run", "dev"],
        cwd="/Users/dracoseven/ai-fake-project-porto/web-portfolio",
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True
    )
    
    # Wait for the server to spin up and bind to port 5173
    print("Waiting 5 seconds for server to start...")
    time.sleep(5)
    
    screenshot_path = "/Users/dracoseven/ai-fake-project-porto/web-portfolio/SCREENSHOT_LABEL_TO_DELETE_fixed_mobile.png"
    
    try:
        # 2. Launch Playwright
        print("Launching Playwright...")
        with sync_playwright() as p:
            # Emulate an iPhone X (375x812 viewport with high device scale factor)
            device = p.devices['iPhone X']
            print(f"Emulating device: {device['user_agent']}")
            
            browser = p.chromium.launch(headless=True)
            context = browser.new_context(**device)
            page = context.new_page()
            
            # Go to the local server
            print("Navigating to http://localhost:5173 ...")
            page.goto("http://localhost:5173")
            
            # Wait for dynamic js loading (networkidle)
            page.wait_for_load_state("networkidle")
            print("Page loaded successfully. Waiting additional 2 seconds for Three.js and GSAP transitions...")
            page.wait_for_timeout(2000)
            
            # Capture the screenshot of the current viewport
            print(f"Capturing screenshot and saving to: {screenshot_path} ...")
            page.screenshot(path=screenshot_path, full_page=True)
            print("Screenshot captured successfully!")
            
            browser.close()
            
    except Exception as e:
        print(f"Error during Playwright execution: {e}", file=sys.stderr)
        
    finally:
        # 3. Kill the Vite server process clean
        print("Stopping Vite development server...")
        server_process.terminate()
        server_process.wait()
        print("Server stopped.")

if __name__ == "__main__":
    run_screenshot()
