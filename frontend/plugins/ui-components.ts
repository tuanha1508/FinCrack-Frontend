// UI Components Plugin
import { defineNuxtPlugin } from 'nuxt/app'
import { Button } from '../components/ui/button'
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription
} from '../components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectTrigger,
  SelectValue
} from '../components/ui/select'

export default defineNuxtPlugin((nuxtApp: any) => {
  // Fix for className.indexOf is not a function error
  // This happens when className is not a string but code tries to call indexOf on it
  if (typeof window !== 'undefined') {
    const originalGetAttribute = Element.prototype.getAttribute;
    Element.prototype.getAttribute = function(this: Element, name: string) {
      if (name === 'class' || name === 'className') {
        const value = originalGetAttribute.call(this, name);
        return value === null ? '' : String(value);
      }
      return originalGetAttribute.call(this, name);
    };
    
    // Also ensure className property is always a string
    Object.defineProperty(Element.prototype, 'className', {
      get: function() {
        const value = this.getAttribute('class');
        return value === null ? '' : String(value);
      },
      set: function(value) {
        this.setAttribute('class', value);
      },
      configurable: true
    });
  }

  nuxtApp.vueApp.component('UiButton', Button)
  nuxtApp.vueApp.component('UiCard', Card)
  nuxtApp.vueApp.component('UiCardContent', CardContent)
  nuxtApp.vueApp.component('UiCardHeader', CardHeader)
  nuxtApp.vueApp.component('UiCardTitle', CardTitle)
  nuxtApp.vueApp.component('UiCardFooter', CardFooter)
  nuxtApp.vueApp.component('UiCardDescription', CardDescription)
  
  // Register Select components
  nuxtApp.vueApp.component('UiSelect', Select)
  nuxtApp.vueApp.component('UiSelectContent', SelectContent)
  nuxtApp.vueApp.component('UiSelectItem', SelectItem)
  nuxtApp.vueApp.component('UiSelectItemText', SelectItemText)
  nuxtApp.vueApp.component('UiSelectTrigger', SelectTrigger)
  nuxtApp.vueApp.component('UiSelectValue', SelectValue)
}) 