#!/usr/bin/env python3

from playwright.sync_api import sync_playwright
import json

def debug_experience_layout():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        
        try:
            # Navegar a la aplicación
            page.goto('http://localhost:5173')
            page.wait_for_load_state('networkidle')
            
            # Tomar screenshot completo
            page.screenshot(path='/tmp/portfolio_debug.png', full_page=True)
            print("Screenshot guardado en: /tmp/portfolio_debug.png")
            
            # Navegar a la sección de experiencia si no está visible
            page.locator('text=EXPERIENCIA').click()
            page.wait_for_timeout(1000)
            
            # Hacer screenshot de la sección de experiencia
            experience_section = page.locator('#experiencia')
            if experience_section.count() > 0:
                experience_section.screenshot(path='/tmp/experience_section.png')
                print("Screenshot de experiencia guardado en: /tmp/experience_section.png")
            
            # Verificar qué clases se están aplicando
            layout_div = page.locator('.exp-layout').first
            if layout_div.count() > 0:
                layout_classes = layout_div.get_attribute('class')
                print(f"Clases del layout: {layout_classes}")
            
            # Verificar las tarjetas pequeñas
            cards = page.locator('.exp-card-small')
            card_count = cards.count()
            print(f"Número de tarjetas encontradas: {card_count}")
            
            if card_count > 0:
                for i in range(card_count):
                    card = cards.nth(i)
                    
                    # Obtener estilos computados
                    computed_styles = page.evaluate("""(element) => {
                        const styles = window.getComputedStyle(element);
                        return {
                            width: styles.width,
                            maxWidth: styles.maxWidth,
                            flex: styles.flex,
                            flexBasis: styles.flexBasis,
                            flexGrow: styles.flexGrow,
                            flexShrink: styles.flexShrink
                        };
                    }""", card.element_handle())
                    
                    print(f"\nTarjeta {i+1}:")
                    print(f"  width: {computed_styles['width']}")
                    print(f"  maxWidth: {computed_styles['maxWidth']}")
                    print(f"  flex: {computed_styles['flex']}")
                    print(f"  flexBasis: {computed_styles['flexBasis']}")
                    
            # Verificar el contenedor padre
            list_container = page.locator('.exp-list').first
            if list_container.count() > 0:
                parent_styles = page.evaluate("""(element) => {
                    const styles = window.getComputedStyle(element);
                    return {
                        display: styles.display,
                        flexDirection: styles.flexDirection,
                        width: styles.width,
                        gap: styles.gap
                    };
                }""", list_container.element_handle())
                
                print(f"\nContenedor padre (.exp-list):")
                print(f"  display: {parent_styles['display']}")
                print(f"  flexDirection: {parent_styles['flexDirection']}")
                print(f"  width: {parent_styles['width']}")
                print(f"  gap: {parent_styles['gap']}")
                
        except Exception as e:
            print(f"Error durante la depuración: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    debug_experience_layout()