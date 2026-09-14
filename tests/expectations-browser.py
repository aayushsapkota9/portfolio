from pathlib import Path

from playwright.sync_api import sync_playwright


BASE_URL = 'http://localhost:4321/expectations'
SCREENSHOT_DIR = Path('/tmp/portfolio-expectations-check')


def assert_tab_state(page, active, inactive, visible_panel, hidden_panel):
    assert active.get_attribute('aria-selected') == 'true'
    assert inactive.get_attribute('aria-selected') == 'false'
    assert visible_panel.is_visible()
    assert hidden_panel.is_hidden()


with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 1440, 'height': 1200}, device_scale_factor=1)
    errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))

    page.goto(BASE_URL, wait_until='domcontentloaded')
    page.wait_for_timeout(1900)
    dev_toolbar = page.locator('#dev-toolbar-root')
    if dev_toolbar.count():
        dev_toolbar.evaluate("node => node.style.display = 'none'")
    business_tab = page.get_by_role('tab', name='Business owner')
    developer_tab = page.get_by_role('tab', name='Developer')
    business_panel = page.locator('#business-owner-panel')
    developer_panel = page.locator('#developer-panel')

    assert_tab_state(page, business_tab, developer_tab, business_panel, developer_panel)
    assert page.get_by_role('heading', name='What I can build for your business.').is_visible()
    assert page.evaluate('() => document.documentElement.scrollWidth <= window.innerWidth')
    business_cards = page.locator('.business-system')
    assert business_cards.count() == 6
    assert page.get_by_role('heading', name='AI & chatbot integration').is_visible()
    assert page.get_by_role('heading', name='Company presence').is_visible()
    assert page.locator('.business-system__visual img').evaluate_all(
        'images => images.every(image => image.complete && image.naturalWidth > 0)'
    )
    assert page.locator('.business-system__number').evaluate_all('''markers => markers.every(marker => {
        const markerBox = marker.getBoundingClientRect();
        const visualBox = marker.parentElement.getBoundingClientRect();
        return markerBox.top >= visualBox.top && markerBox.bottom <= visualBox.bottom;
    })''')
    assert business_cards.evaluate_all('''cards => cards.every(card => {
        const listBox = card.querySelector('.scope-details').getBoundingClientRect();
        const actionBox = card.querySelector('.business-system__action').getBoundingClientRect();
        return actionBox.top - listBox.bottom >= 20;
    })''')

    SCREENSHOT_DIR.mkdir(parents=True, exist_ok=True)
    page.screenshot(path=str(SCREENSHOT_DIR / 'business-owner.png'), full_page=True)

    page.set_viewport_size({'width': 390, 'height': 844})
    assert business_tab.bounding_box()['width'] > 300
    page.screenshot(path=str(SCREENSHOT_DIR / 'business-owner-mobile.png'), full_page=True)
    page.set_viewport_size({'width': 1440, 'height': 1200})

    developer_tab.click()
    page.wait_for_timeout(600)
    assert_tab_state(page, developer_tab, business_tab, developer_panel, business_panel)
    assert page.get_by_role('heading', name='Comfortable owning').is_visible()
    assert page.get_by_text('Technology focus', exact=True).count() == 3
    assert page.get_by_text('Project evidence', exact=True).count() == 3
    assert page.locator('.scope-step__card').evaluate_all(
        "cards => cards.every(card => parseFloat(getComputedStyle(card).paddingLeft) >= 32)"
    )
    assert page.evaluate('''() => {
        const lead = document.querySelector('#developer-panel .section-heading p').getBoundingClientRect();
        const rail = document.querySelector('.scope-rail').getBoundingClientRect();
        return rail.top - lead.bottom >= 48;
    }''')
    page.screenshot(path=str(SCREENSHOT_DIR / 'developer.png'), full_page=True)

    developer_tab.focus()
    page.keyboard.press('ArrowLeft')
    assert_tab_state(page, business_tab, developer_tab, business_panel, developer_panel)
    assert not errors, errors
    browser.close()
