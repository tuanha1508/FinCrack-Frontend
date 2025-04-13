
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T extends DefineComponent> = T & DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>>
type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = (T & DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }>)
interface _GlobalComponents {
      'CompanySearch': typeof import("../components/CompanySearch.vue")['default']
    'SidebarNavigation': typeof import("../components/SidebarNavigation.vue")['default']
    'AboutCalculatorSection': typeof import("../components/about/CalculatorSection.vue")['default']
    'AboutCallToActionSection': typeof import("../components/about/CallToActionSection.vue")['default']
    'AboutDemoSection': typeof import("../components/about/DemoSection.vue")['default']
    'AboutFaqSection': typeof import("../components/about/FaqSection.vue")['default']
    'AboutFeaturesSection': typeof import("../components/about/FeaturesSection.vue")['default']
    'AboutHeroSection': typeof import("../components/about/HeroSection.vue")['default']
    'AboutMarketTrendsSection': typeof import("../components/about/MarketTrendsSection.vue")['default']
    'AboutTeamSection': typeof import("../components/about/TeamSection.vue")['default']
    'AuthFormWrapper': typeof import("../components/auth/AuthFormWrapper.vue")['default']
    'AuthForgotPasswordForm': typeof import("../components/auth/ForgotPasswordForm.vue")['default']
    'AuthLoginForm': typeof import("../components/auth/LoginForm.vue")['default']
    'AuthSignUpForm': typeof import("../components/auth/SignUpForm.vue")['default']
    'AuthSocialAuthButtons': typeof import("../components/auth/SocialAuthButtons.vue")['default']
    'BankCard': typeof import("../components/bank/BankCard.vue")['default']
    'BankBankingServices': typeof import("../components/bank/BankingServices.vue")['default']
    'BankCustomerType': typeof import("../components/bank/CustomerType.vue")['default']
    'BankPreferenceSummary': typeof import("../components/bank/PreferenceSummary.vue")['default']
    'BankRankingPreferences': typeof import("../components/bank/RankingPreferences.vue")['default']
    'DashboardBankRecommendation': typeof import("../components/dashboard/BankRecommendation.vue")['default']
    'DashboardCompanyFinancialOverview': typeof import("../components/dashboard/CompanyFinancialOverview.vue")['default']
    'DashboardCompanyFinancialOverviewHardcoded': typeof import("../components/dashboard/CompanyFinancialOverviewHardcoded.vue")['default']
    'DashboardCompanySearchBar': typeof import("../components/dashboard/CompanySearchBar.vue")['default']
    'DashboardCompanySearchBarHardcoded': typeof import("../components/dashboard/CompanySearchBarHardcoded.vue")['default']
    'DashboardServiceProfileForm': typeof import("../components/dashboard/ServiceProfileForm.vue")['default']
    'DashboardServiceRecommendation': typeof import("../components/dashboard/ServiceRecommendation.vue")['default']
    'LayoutAppFooter': typeof import("../components/layout/AppFooter.vue")['default']
    'LayoutAppHeader': typeof import("../components/layout/AppHeader.vue")['default']
    'ContentDoc': typeof import("../node_modules/@nuxt/content/dist/runtime/components/ContentDoc.vue")['default']
    'ContentList': typeof import("../node_modules/@nuxt/content/dist/runtime/components/ContentList.vue")['default']
    'ContentNavigation': typeof import("../node_modules/@nuxt/content/dist/runtime/components/ContentNavigation.vue")['default']
    'ContentQuery': typeof import("../node_modules/@nuxt/content/dist/runtime/components/ContentQuery.vue")['default']
    'ContentRenderer': typeof import("../node_modules/@nuxt/content/dist/runtime/components/ContentRenderer.vue")['default']
    'ContentRendererMarkdown': typeof import("../node_modules/@nuxt/content/dist/runtime/components/ContentRendererMarkdown.vue")['default']
    'ContentSlot': typeof import("../node_modules/@nuxt/content/dist/runtime/components/ContentSlot.vue")['default']
    'DocumentDrivenEmpty': typeof import("../node_modules/@nuxt/content/dist/runtime/components/DocumentDrivenEmpty.vue")['default']
    'DocumentDrivenNotFound': typeof import("../node_modules/@nuxt/content/dist/runtime/components/DocumentDrivenNotFound.vue")['default']
    'Markdown': typeof import("../node_modules/@nuxt/content/dist/runtime/components/Markdown.vue")['default']
    'ProseCode': typeof import("../node_modules/@nuxt/content/dist/runtime/components/Prose/ProseCode.vue")['default']
    'ProseCodeInline': typeof import("../node_modules/@nuxt/content/dist/runtime/components/Prose/ProseCodeInline.vue")['default']
    'ProsePre': typeof import("../node_modules/@nuxt/content/dist/runtime/components/Prose/ProsePre.vue")['default']
    'ProseA': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseA.vue")['default']
    'ProseBlockquote': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseBlockquote.vue")['default']
    'ProseEm': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseEm.vue")['default']
    'ProseH1': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH1.vue")['default']
    'ProseH2': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH2.vue")['default']
    'ProseH3': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH3.vue")['default']
    'ProseH4': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH4.vue")['default']
    'ProseH5': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH5.vue")['default']
    'ProseH6': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH6.vue")['default']
    'ProseHr': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseHr.vue")['default']
    'ProseImg': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseImg.vue")['default']
    'ProseLi': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseLi.vue")['default']
    'ProseOl': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseOl.vue")['default']
    'ProseP': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseP.vue")['default']
    'ProseScript': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseScript.vue")['default']
    'ProseStrong': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseStrong.vue")['default']
    'ProseTable': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTable.vue")['default']
    'ProseTbody': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTbody.vue")['default']
    'ProseTd': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTd.vue")['default']
    'ProseTh': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTh.vue")['default']
    'ProseThead': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseThead.vue")['default']
    'ProseTr': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTr.vue")['default']
    'ProseUl': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseUl.vue")['default']
    'NuxtWelcome': typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
    'NuxtLayout': typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
    'NuxtErrorBoundary': typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary")['default']
    'ClientOnly': typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
    'DevOnly': typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
    'ServerPlaceholder': typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
    'NuxtLink': typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
    'NuxtLoadingIndicator': typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
    'NuxtRouteAnnouncer': typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
    'NuxtImg': typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']
    'NuxtPicture': typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']
    'MDC': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/MDC.vue")['default']
    'MDCRenderer': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/MDCRenderer.vue")['default']
    'MDCSlot': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/MDCSlot.vue")['default']
    'Icon': typeof import("../node_modules/nuxt-icon/dist/runtime/Icon.vue")['default']
    'IconCSS': typeof import("../node_modules/nuxt-icon/dist/runtime/IconCSS.vue")['default']
    'ColorScheme': typeof import("../node_modules/@nuxtjs/color-mode/dist/runtime/component.vue3.vue")['default']
    'Card': typeof import("../components/ui/card/index")['Card']
    'CardAction': typeof import("../components/ui/card/index")['CardAction']
    'CardContent': typeof import("../components/ui/card/index")['CardContent']
    'CardDescription': typeof import("../components/ui/card/index")['CardDescription']
    'CardFooter': typeof import("../components/ui/card/index")['CardFooter']
    'CardHeader': typeof import("../components/ui/card/index")['CardHeader']
    'CardTitle': typeof import("../components/ui/card/index")['CardTitle']
    'Button': typeof import("../components/ui/button/index")['Button']
    'Chart': typeof import("../components/ui/chart/index")['Chart']
    'Checkbox': typeof import("../components/ui/checkbox/index")['Checkbox']
    'CustomButton': typeof import("../components/ui/custombutton/index")['CustomButton']
    'FormInput': typeof import("../components/ui/forminput/index")['FormInput']
    'Input': typeof import("../components/ui/input/index")['Input']
    'Label': typeof import("../components/ui/label/index")['Label']
    'RadioGroup': typeof import("../components/ui/radio-group/index")['RadioGroup']
    'RadioGroupItem': typeof import("../components/ui/radio-group/index")['RadioGroupItem']
    'Select': typeof import("../components/ui/select/index")['Select']
    'SelectContent': typeof import("../components/ui/select/index")['SelectContent']
    'SelectGroup': typeof import("../components/ui/select/index")['SelectGroup']
    'SelectItem': typeof import("../components/ui/select/index")['SelectItem']
    'SelectItemText': typeof import("../components/ui/select/index")['SelectItemText']
    'SelectLabel': typeof import("../components/ui/select/index")['SelectLabel']
    'SelectScrollDownButton': typeof import("../components/ui/select/index")['SelectScrollDownButton']
    'SelectScrollUpButton': typeof import("../components/ui/select/index")['SelectScrollUpButton']
    'SelectSeparator': typeof import("../components/ui/select/index")['SelectSeparator']
    'SelectTrigger': typeof import("../components/ui/select/index")['SelectTrigger']
    'SelectValue': typeof import("../components/ui/select/index")['SelectValue']
    'SocialButton': typeof import("../components/ui/socialbutton/index")['SocialButton']
    'NuxtPage': typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
    'NoScript': typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
    'Link': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
    'Base': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
    'Title': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
    'Meta': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
    'Style': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
    'Head': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
    'Html': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
    'Body': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
    'NuxtIsland': typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
    'NuxtRouteAnnouncer': IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
      'LazyCompanySearch': LazyComponent<typeof import("../components/CompanySearch.vue")['default']>
    'LazySidebarNavigation': LazyComponent<typeof import("../components/SidebarNavigation.vue")['default']>
    'LazyAboutCalculatorSection': LazyComponent<typeof import("../components/about/CalculatorSection.vue")['default']>
    'LazyAboutCallToActionSection': LazyComponent<typeof import("../components/about/CallToActionSection.vue")['default']>
    'LazyAboutDemoSection': LazyComponent<typeof import("../components/about/DemoSection.vue")['default']>
    'LazyAboutFaqSection': LazyComponent<typeof import("../components/about/FaqSection.vue")['default']>
    'LazyAboutFeaturesSection': LazyComponent<typeof import("../components/about/FeaturesSection.vue")['default']>
    'LazyAboutHeroSection': LazyComponent<typeof import("../components/about/HeroSection.vue")['default']>
    'LazyAboutMarketTrendsSection': LazyComponent<typeof import("../components/about/MarketTrendsSection.vue")['default']>
    'LazyAboutTeamSection': LazyComponent<typeof import("../components/about/TeamSection.vue")['default']>
    'LazyAuthFormWrapper': LazyComponent<typeof import("../components/auth/AuthFormWrapper.vue")['default']>
    'LazyAuthForgotPasswordForm': LazyComponent<typeof import("../components/auth/ForgotPasswordForm.vue")['default']>
    'LazyAuthLoginForm': LazyComponent<typeof import("../components/auth/LoginForm.vue")['default']>
    'LazyAuthSignUpForm': LazyComponent<typeof import("../components/auth/SignUpForm.vue")['default']>
    'LazyAuthSocialAuthButtons': LazyComponent<typeof import("../components/auth/SocialAuthButtons.vue")['default']>
    'LazyBankCard': LazyComponent<typeof import("../components/bank/BankCard.vue")['default']>
    'LazyBankBankingServices': LazyComponent<typeof import("../components/bank/BankingServices.vue")['default']>
    'LazyBankCustomerType': LazyComponent<typeof import("../components/bank/CustomerType.vue")['default']>
    'LazyBankPreferenceSummary': LazyComponent<typeof import("../components/bank/PreferenceSummary.vue")['default']>
    'LazyBankRankingPreferences': LazyComponent<typeof import("../components/bank/RankingPreferences.vue")['default']>
    'LazyDashboardBankRecommendation': LazyComponent<typeof import("../components/dashboard/BankRecommendation.vue")['default']>
    'LazyDashboardCompanyFinancialOverview': LazyComponent<typeof import("../components/dashboard/CompanyFinancialOverview.vue")['default']>
    'LazyDashboardCompanyFinancialOverviewHardcoded': LazyComponent<typeof import("../components/dashboard/CompanyFinancialOverviewHardcoded.vue")['default']>
    'LazyDashboardCompanySearchBar': LazyComponent<typeof import("../components/dashboard/CompanySearchBar.vue")['default']>
    'LazyDashboardCompanySearchBarHardcoded': LazyComponent<typeof import("../components/dashboard/CompanySearchBarHardcoded.vue")['default']>
    'LazyDashboardServiceProfileForm': LazyComponent<typeof import("../components/dashboard/ServiceProfileForm.vue")['default']>
    'LazyDashboardServiceRecommendation': LazyComponent<typeof import("../components/dashboard/ServiceRecommendation.vue")['default']>
    'LazyLayoutAppFooter': LazyComponent<typeof import("../components/layout/AppFooter.vue")['default']>
    'LazyLayoutAppHeader': LazyComponent<typeof import("../components/layout/AppHeader.vue")['default']>
    'LazyContentDoc': LazyComponent<typeof import("../node_modules/@nuxt/content/dist/runtime/components/ContentDoc.vue")['default']>
    'LazyContentList': LazyComponent<typeof import("../node_modules/@nuxt/content/dist/runtime/components/ContentList.vue")['default']>
    'LazyContentNavigation': LazyComponent<typeof import("../node_modules/@nuxt/content/dist/runtime/components/ContentNavigation.vue")['default']>
    'LazyContentQuery': LazyComponent<typeof import("../node_modules/@nuxt/content/dist/runtime/components/ContentQuery.vue")['default']>
    'LazyContentRenderer': LazyComponent<typeof import("../node_modules/@nuxt/content/dist/runtime/components/ContentRenderer.vue")['default']>
    'LazyContentRendererMarkdown': LazyComponent<typeof import("../node_modules/@nuxt/content/dist/runtime/components/ContentRendererMarkdown.vue")['default']>
    'LazyContentSlot': LazyComponent<typeof import("../node_modules/@nuxt/content/dist/runtime/components/ContentSlot.vue")['default']>
    'LazyDocumentDrivenEmpty': LazyComponent<typeof import("../node_modules/@nuxt/content/dist/runtime/components/DocumentDrivenEmpty.vue")['default']>
    'LazyDocumentDrivenNotFound': LazyComponent<typeof import("../node_modules/@nuxt/content/dist/runtime/components/DocumentDrivenNotFound.vue")['default']>
    'LazyMarkdown': LazyComponent<typeof import("../node_modules/@nuxt/content/dist/runtime/components/Markdown.vue")['default']>
    'LazyProseCode': LazyComponent<typeof import("../node_modules/@nuxt/content/dist/runtime/components/Prose/ProseCode.vue")['default']>
    'LazyProseCodeInline': LazyComponent<typeof import("../node_modules/@nuxt/content/dist/runtime/components/Prose/ProseCodeInline.vue")['default']>
    'LazyProsePre': LazyComponent<typeof import("../node_modules/@nuxt/content/dist/runtime/components/Prose/ProsePre.vue")['default']>
    'LazyProseA': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseA.vue")['default']>
    'LazyProseBlockquote': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseBlockquote.vue")['default']>
    'LazyProseEm': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseEm.vue")['default']>
    'LazyProseH1': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH1.vue")['default']>
    'LazyProseH2': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH2.vue")['default']>
    'LazyProseH3': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH3.vue")['default']>
    'LazyProseH4': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH4.vue")['default']>
    'LazyProseH5': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH5.vue")['default']>
    'LazyProseH6': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH6.vue")['default']>
    'LazyProseHr': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseHr.vue")['default']>
    'LazyProseImg': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseImg.vue")['default']>
    'LazyProseLi': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseLi.vue")['default']>
    'LazyProseOl': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseOl.vue")['default']>
    'LazyProseP': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseP.vue")['default']>
    'LazyProseScript': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseScript.vue")['default']>
    'LazyProseStrong': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseStrong.vue")['default']>
    'LazyProseTable': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTable.vue")['default']>
    'LazyProseTbody': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTbody.vue")['default']>
    'LazyProseTd': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTd.vue")['default']>
    'LazyProseTh': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTh.vue")['default']>
    'LazyProseThead': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseThead.vue")['default']>
    'LazyProseTr': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTr.vue")['default']>
    'LazyProseUl': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseUl.vue")['default']>
    'LazyNuxtWelcome': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
    'LazyNuxtLayout': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
    'LazyNuxtErrorBoundary': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary")['default']>
    'LazyClientOnly': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
    'LazyDevOnly': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
    'LazyServerPlaceholder': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
    'LazyNuxtLink': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
    'LazyNuxtLoadingIndicator': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
    'LazyNuxtImg': LazyComponent<typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']>
    'LazyNuxtPicture': LazyComponent<typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']>
    'LazyMDC': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/MDC.vue")['default']>
    'LazyMDCRenderer': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/MDCRenderer.vue")['default']>
    'LazyMDCSlot': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/MDCSlot.vue")['default']>
    'LazyIcon': LazyComponent<typeof import("../node_modules/nuxt-icon/dist/runtime/Icon.vue")['default']>
    'LazyIconCSS': LazyComponent<typeof import("../node_modules/nuxt-icon/dist/runtime/IconCSS.vue")['default']>
    'LazyColorScheme': LazyComponent<typeof import("../node_modules/@nuxtjs/color-mode/dist/runtime/component.vue3.vue")['default']>
    'LazyCard': LazyComponent<typeof import("../components/ui/card/index")['Card']>
    'LazyCardAction': LazyComponent<typeof import("../components/ui/card/index")['CardAction']>
    'LazyCardContent': LazyComponent<typeof import("../components/ui/card/index")['CardContent']>
    'LazyCardDescription': LazyComponent<typeof import("../components/ui/card/index")['CardDescription']>
    'LazyCardFooter': LazyComponent<typeof import("../components/ui/card/index")['CardFooter']>
    'LazyCardHeader': LazyComponent<typeof import("../components/ui/card/index")['CardHeader']>
    'LazyCardTitle': LazyComponent<typeof import("../components/ui/card/index")['CardTitle']>
    'LazyButton': LazyComponent<typeof import("../components/ui/button/index")['Button']>
    'LazyChart': LazyComponent<typeof import("../components/ui/chart/index")['Chart']>
    'LazyCheckbox': LazyComponent<typeof import("../components/ui/checkbox/index")['Checkbox']>
    'LazyCustomButton': LazyComponent<typeof import("../components/ui/custombutton/index")['CustomButton']>
    'LazyFormInput': LazyComponent<typeof import("../components/ui/forminput/index")['FormInput']>
    'LazyInput': LazyComponent<typeof import("../components/ui/input/index")['Input']>
    'LazyLabel': LazyComponent<typeof import("../components/ui/label/index")['Label']>
    'LazyRadioGroup': LazyComponent<typeof import("../components/ui/radio-group/index")['RadioGroup']>
    'LazyRadioGroupItem': LazyComponent<typeof import("../components/ui/radio-group/index")['RadioGroupItem']>
    'LazySelect': LazyComponent<typeof import("../components/ui/select/index")['Select']>
    'LazySelectContent': LazyComponent<typeof import("../components/ui/select/index")['SelectContent']>
    'LazySelectGroup': LazyComponent<typeof import("../components/ui/select/index")['SelectGroup']>
    'LazySelectItem': LazyComponent<typeof import("../components/ui/select/index")['SelectItem']>
    'LazySelectItemText': LazyComponent<typeof import("../components/ui/select/index")['SelectItemText']>
    'LazySelectLabel': LazyComponent<typeof import("../components/ui/select/index")['SelectLabel']>
    'LazySelectScrollDownButton': LazyComponent<typeof import("../components/ui/select/index")['SelectScrollDownButton']>
    'LazySelectScrollUpButton': LazyComponent<typeof import("../components/ui/select/index")['SelectScrollUpButton']>
    'LazySelectSeparator': LazyComponent<typeof import("../components/ui/select/index")['SelectSeparator']>
    'LazySelectTrigger': LazyComponent<typeof import("../components/ui/select/index")['SelectTrigger']>
    'LazySelectValue': LazyComponent<typeof import("../components/ui/select/index")['SelectValue']>
    'LazySocialButton': LazyComponent<typeof import("../components/ui/socialbutton/index")['SocialButton']>
    'LazyNuxtPage': LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
    'LazyNoScript': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
    'LazyLink': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
    'LazyBase': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
    'LazyTitle': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
    'LazyMeta': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
    'LazyStyle': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
    'LazyHead': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
    'LazyHtml': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
    'LazyBody': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
    'LazyNuxtIsland': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export const CompanySearch: typeof import("../components/CompanySearch.vue")['default']
export const SidebarNavigation: typeof import("../components/SidebarNavigation.vue")['default']
export const AboutCalculatorSection: typeof import("../components/about/CalculatorSection.vue")['default']
export const AboutCallToActionSection: typeof import("../components/about/CallToActionSection.vue")['default']
export const AboutDemoSection: typeof import("../components/about/DemoSection.vue")['default']
export const AboutFaqSection: typeof import("../components/about/FaqSection.vue")['default']
export const AboutFeaturesSection: typeof import("../components/about/FeaturesSection.vue")['default']
export const AboutHeroSection: typeof import("../components/about/HeroSection.vue")['default']
export const AboutMarketTrendsSection: typeof import("../components/about/MarketTrendsSection.vue")['default']
export const AboutTeamSection: typeof import("../components/about/TeamSection.vue")['default']
export const AuthFormWrapper: typeof import("../components/auth/AuthFormWrapper.vue")['default']
export const AuthForgotPasswordForm: typeof import("../components/auth/ForgotPasswordForm.vue")['default']
export const AuthLoginForm: typeof import("../components/auth/LoginForm.vue")['default']
export const AuthSignUpForm: typeof import("../components/auth/SignUpForm.vue")['default']
export const AuthSocialAuthButtons: typeof import("../components/auth/SocialAuthButtons.vue")['default']
export const BankCard: typeof import("../components/bank/BankCard.vue")['default']
export const BankBankingServices: typeof import("../components/bank/BankingServices.vue")['default']
export const BankCustomerType: typeof import("../components/bank/CustomerType.vue")['default']
export const BankPreferenceSummary: typeof import("../components/bank/PreferenceSummary.vue")['default']
export const BankRankingPreferences: typeof import("../components/bank/RankingPreferences.vue")['default']
export const DashboardBankRecommendation: typeof import("../components/dashboard/BankRecommendation.vue")['default']
export const DashboardCompanyFinancialOverview: typeof import("../components/dashboard/CompanyFinancialOverview.vue")['default']
export const DashboardCompanyFinancialOverviewHardcoded: typeof import("../components/dashboard/CompanyFinancialOverviewHardcoded.vue")['default']
export const DashboardCompanySearchBar: typeof import("../components/dashboard/CompanySearchBar.vue")['default']
export const DashboardCompanySearchBarHardcoded: typeof import("../components/dashboard/CompanySearchBarHardcoded.vue")['default']
export const DashboardServiceProfileForm: typeof import("../components/dashboard/ServiceProfileForm.vue")['default']
export const DashboardServiceRecommendation: typeof import("../components/dashboard/ServiceRecommendation.vue")['default']
export const LayoutAppFooter: typeof import("../components/layout/AppFooter.vue")['default']
export const LayoutAppHeader: typeof import("../components/layout/AppHeader.vue")['default']
export const ContentDoc: typeof import("../node_modules/@nuxt/content/dist/runtime/components/ContentDoc.vue")['default']
export const ContentList: typeof import("../node_modules/@nuxt/content/dist/runtime/components/ContentList.vue")['default']
export const ContentNavigation: typeof import("../node_modules/@nuxt/content/dist/runtime/components/ContentNavigation.vue")['default']
export const ContentQuery: typeof import("../node_modules/@nuxt/content/dist/runtime/components/ContentQuery.vue")['default']
export const ContentRenderer: typeof import("../node_modules/@nuxt/content/dist/runtime/components/ContentRenderer.vue")['default']
export const ContentRendererMarkdown: typeof import("../node_modules/@nuxt/content/dist/runtime/components/ContentRendererMarkdown.vue")['default']
export const ContentSlot: typeof import("../node_modules/@nuxt/content/dist/runtime/components/ContentSlot.vue")['default']
export const DocumentDrivenEmpty: typeof import("../node_modules/@nuxt/content/dist/runtime/components/DocumentDrivenEmpty.vue")['default']
export const DocumentDrivenNotFound: typeof import("../node_modules/@nuxt/content/dist/runtime/components/DocumentDrivenNotFound.vue")['default']
export const Markdown: typeof import("../node_modules/@nuxt/content/dist/runtime/components/Markdown.vue")['default']
export const ProseCode: typeof import("../node_modules/@nuxt/content/dist/runtime/components/Prose/ProseCode.vue")['default']
export const ProseCodeInline: typeof import("../node_modules/@nuxt/content/dist/runtime/components/Prose/ProseCodeInline.vue")['default']
export const ProsePre: typeof import("../node_modules/@nuxt/content/dist/runtime/components/Prose/ProsePre.vue")['default']
export const ProseA: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseA.vue")['default']
export const ProseBlockquote: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseBlockquote.vue")['default']
export const ProseEm: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseEm.vue")['default']
export const ProseH1: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH1.vue")['default']
export const ProseH2: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH2.vue")['default']
export const ProseH3: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH3.vue")['default']
export const ProseH4: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH4.vue")['default']
export const ProseH5: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH5.vue")['default']
export const ProseH6: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH6.vue")['default']
export const ProseHr: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseHr.vue")['default']
export const ProseImg: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseImg.vue")['default']
export const ProseLi: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseLi.vue")['default']
export const ProseOl: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseOl.vue")['default']
export const ProseP: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseP.vue")['default']
export const ProseScript: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseScript.vue")['default']
export const ProseStrong: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseStrong.vue")['default']
export const ProseTable: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTable.vue")['default']
export const ProseTbody: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTbody.vue")['default']
export const ProseTd: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTd.vue")['default']
export const ProseTh: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTh.vue")['default']
export const ProseThead: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseThead.vue")['default']
export const ProseTr: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTr.vue")['default']
export const ProseUl: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseUl.vue")['default']
export const NuxtWelcome: typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const NuxtLayout: typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const NuxtErrorBoundary: typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary")['default']
export const ClientOnly: typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
export const DevOnly: typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtLink: typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const NuxtLoadingIndicator: typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const NuxtImg: typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']
export const NuxtPicture: typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']
export const MDC: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/MDC.vue")['default']
export const MDCRenderer: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/MDCRenderer.vue")['default']
export const MDCSlot: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/MDCSlot.vue")['default']
export const Icon: typeof import("../node_modules/nuxt-icon/dist/runtime/Icon.vue")['default']
export const IconCSS: typeof import("../node_modules/nuxt-icon/dist/runtime/IconCSS.vue")['default']
export const ColorScheme: typeof import("../node_modules/@nuxtjs/color-mode/dist/runtime/component.vue3.vue")['default']
export const Card: typeof import("../components/ui/card/index")['Card']
export const CardAction: typeof import("../components/ui/card/index")['CardAction']
export const CardContent: typeof import("../components/ui/card/index")['CardContent']
export const CardDescription: typeof import("../components/ui/card/index")['CardDescription']
export const CardFooter: typeof import("../components/ui/card/index")['CardFooter']
export const CardHeader: typeof import("../components/ui/card/index")['CardHeader']
export const CardTitle: typeof import("../components/ui/card/index")['CardTitle']
export const Button: typeof import("../components/ui/button/index")['Button']
export const Chart: typeof import("../components/ui/chart/index")['Chart']
export const Checkbox: typeof import("../components/ui/checkbox/index")['Checkbox']
export const CustomButton: typeof import("../components/ui/custombutton/index")['CustomButton']
export const FormInput: typeof import("../components/ui/forminput/index")['FormInput']
export const Input: typeof import("../components/ui/input/index")['Input']
export const Label: typeof import("../components/ui/label/index")['Label']
export const RadioGroup: typeof import("../components/ui/radio-group/index")['RadioGroup']
export const RadioGroupItem: typeof import("../components/ui/radio-group/index")['RadioGroupItem']
export const Select: typeof import("../components/ui/select/index")['Select']
export const SelectContent: typeof import("../components/ui/select/index")['SelectContent']
export const SelectGroup: typeof import("../components/ui/select/index")['SelectGroup']
export const SelectItem: typeof import("../components/ui/select/index")['SelectItem']
export const SelectItemText: typeof import("../components/ui/select/index")['SelectItemText']
export const SelectLabel: typeof import("../components/ui/select/index")['SelectLabel']
export const SelectScrollDownButton: typeof import("../components/ui/select/index")['SelectScrollDownButton']
export const SelectScrollUpButton: typeof import("../components/ui/select/index")['SelectScrollUpButton']
export const SelectSeparator: typeof import("../components/ui/select/index")['SelectSeparator']
export const SelectTrigger: typeof import("../components/ui/select/index")['SelectTrigger']
export const SelectValue: typeof import("../components/ui/select/index")['SelectValue']
export const SocialButton: typeof import("../components/ui/socialbutton/index")['SocialButton']
export const NuxtPage: typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
export const NoScript: typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
export const NuxtIsland: typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const NuxtRouteAnnouncer: IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyCompanySearch: LazyComponent<typeof import("../components/CompanySearch.vue")['default']>
export const LazySidebarNavigation: LazyComponent<typeof import("../components/SidebarNavigation.vue")['default']>
export const LazyAboutCalculatorSection: LazyComponent<typeof import("../components/about/CalculatorSection.vue")['default']>
export const LazyAboutCallToActionSection: LazyComponent<typeof import("../components/about/CallToActionSection.vue")['default']>
export const LazyAboutDemoSection: LazyComponent<typeof import("../components/about/DemoSection.vue")['default']>
export const LazyAboutFaqSection: LazyComponent<typeof import("../components/about/FaqSection.vue")['default']>
export const LazyAboutFeaturesSection: LazyComponent<typeof import("../components/about/FeaturesSection.vue")['default']>
export const LazyAboutHeroSection: LazyComponent<typeof import("../components/about/HeroSection.vue")['default']>
export const LazyAboutMarketTrendsSection: LazyComponent<typeof import("../components/about/MarketTrendsSection.vue")['default']>
export const LazyAboutTeamSection: LazyComponent<typeof import("../components/about/TeamSection.vue")['default']>
export const LazyAuthFormWrapper: LazyComponent<typeof import("../components/auth/AuthFormWrapper.vue")['default']>
export const LazyAuthForgotPasswordForm: LazyComponent<typeof import("../components/auth/ForgotPasswordForm.vue")['default']>
export const LazyAuthLoginForm: LazyComponent<typeof import("../components/auth/LoginForm.vue")['default']>
export const LazyAuthSignUpForm: LazyComponent<typeof import("../components/auth/SignUpForm.vue")['default']>
export const LazyAuthSocialAuthButtons: LazyComponent<typeof import("../components/auth/SocialAuthButtons.vue")['default']>
export const LazyBankCard: LazyComponent<typeof import("../components/bank/BankCard.vue")['default']>
export const LazyBankBankingServices: LazyComponent<typeof import("../components/bank/BankingServices.vue")['default']>
export const LazyBankCustomerType: LazyComponent<typeof import("../components/bank/CustomerType.vue")['default']>
export const LazyBankPreferenceSummary: LazyComponent<typeof import("../components/bank/PreferenceSummary.vue")['default']>
export const LazyBankRankingPreferences: LazyComponent<typeof import("../components/bank/RankingPreferences.vue")['default']>
export const LazyDashboardBankRecommendation: LazyComponent<typeof import("../components/dashboard/BankRecommendation.vue")['default']>
export const LazyDashboardCompanyFinancialOverview: LazyComponent<typeof import("../components/dashboard/CompanyFinancialOverview.vue")['default']>
export const LazyDashboardCompanyFinancialOverviewHardcoded: LazyComponent<typeof import("../components/dashboard/CompanyFinancialOverviewHardcoded.vue")['default']>
export const LazyDashboardCompanySearchBar: LazyComponent<typeof import("../components/dashboard/CompanySearchBar.vue")['default']>
export const LazyDashboardCompanySearchBarHardcoded: LazyComponent<typeof import("../components/dashboard/CompanySearchBarHardcoded.vue")['default']>
export const LazyDashboardServiceProfileForm: LazyComponent<typeof import("../components/dashboard/ServiceProfileForm.vue")['default']>
export const LazyDashboardServiceRecommendation: LazyComponent<typeof import("../components/dashboard/ServiceRecommendation.vue")['default']>
export const LazyLayoutAppFooter: LazyComponent<typeof import("../components/layout/AppFooter.vue")['default']>
export const LazyLayoutAppHeader: LazyComponent<typeof import("../components/layout/AppHeader.vue")['default']>
export const LazyContentDoc: LazyComponent<typeof import("../node_modules/@nuxt/content/dist/runtime/components/ContentDoc.vue")['default']>
export const LazyContentList: LazyComponent<typeof import("../node_modules/@nuxt/content/dist/runtime/components/ContentList.vue")['default']>
export const LazyContentNavigation: LazyComponent<typeof import("../node_modules/@nuxt/content/dist/runtime/components/ContentNavigation.vue")['default']>
export const LazyContentQuery: LazyComponent<typeof import("../node_modules/@nuxt/content/dist/runtime/components/ContentQuery.vue")['default']>
export const LazyContentRenderer: LazyComponent<typeof import("../node_modules/@nuxt/content/dist/runtime/components/ContentRenderer.vue")['default']>
export const LazyContentRendererMarkdown: LazyComponent<typeof import("../node_modules/@nuxt/content/dist/runtime/components/ContentRendererMarkdown.vue")['default']>
export const LazyContentSlot: LazyComponent<typeof import("../node_modules/@nuxt/content/dist/runtime/components/ContentSlot.vue")['default']>
export const LazyDocumentDrivenEmpty: LazyComponent<typeof import("../node_modules/@nuxt/content/dist/runtime/components/DocumentDrivenEmpty.vue")['default']>
export const LazyDocumentDrivenNotFound: LazyComponent<typeof import("../node_modules/@nuxt/content/dist/runtime/components/DocumentDrivenNotFound.vue")['default']>
export const LazyMarkdown: LazyComponent<typeof import("../node_modules/@nuxt/content/dist/runtime/components/Markdown.vue")['default']>
export const LazyProseCode: LazyComponent<typeof import("../node_modules/@nuxt/content/dist/runtime/components/Prose/ProseCode.vue")['default']>
export const LazyProseCodeInline: LazyComponent<typeof import("../node_modules/@nuxt/content/dist/runtime/components/Prose/ProseCodeInline.vue")['default']>
export const LazyProsePre: LazyComponent<typeof import("../node_modules/@nuxt/content/dist/runtime/components/Prose/ProsePre.vue")['default']>
export const LazyProseA: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseA.vue")['default']>
export const LazyProseBlockquote: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseBlockquote.vue")['default']>
export const LazyProseEm: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseEm.vue")['default']>
export const LazyProseH1: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH1.vue")['default']>
export const LazyProseH2: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH2.vue")['default']>
export const LazyProseH3: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH3.vue")['default']>
export const LazyProseH4: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH4.vue")['default']>
export const LazyProseH5: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH5.vue")['default']>
export const LazyProseH6: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH6.vue")['default']>
export const LazyProseHr: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseHr.vue")['default']>
export const LazyProseImg: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseImg.vue")['default']>
export const LazyProseLi: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseLi.vue")['default']>
export const LazyProseOl: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseOl.vue")['default']>
export const LazyProseP: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseP.vue")['default']>
export const LazyProseScript: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseScript.vue")['default']>
export const LazyProseStrong: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseStrong.vue")['default']>
export const LazyProseTable: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTable.vue")['default']>
export const LazyProseTbody: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTbody.vue")['default']>
export const LazyProseTd: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTd.vue")['default']>
export const LazyProseTh: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTh.vue")['default']>
export const LazyProseThead: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseThead.vue")['default']>
export const LazyProseTr: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTr.vue")['default']>
export const LazyProseUl: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseUl.vue")['default']>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary")['default']>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']>
export const LazyMDC: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/MDC.vue")['default']>
export const LazyMDCRenderer: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/MDCRenderer.vue")['default']>
export const LazyMDCSlot: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/MDCSlot.vue")['default']>
export const LazyIcon: LazyComponent<typeof import("../node_modules/nuxt-icon/dist/runtime/Icon.vue")['default']>
export const LazyIconCSS: LazyComponent<typeof import("../node_modules/nuxt-icon/dist/runtime/IconCSS.vue")['default']>
export const LazyColorScheme: LazyComponent<typeof import("../node_modules/@nuxtjs/color-mode/dist/runtime/component.vue3.vue")['default']>
export const LazyCard: LazyComponent<typeof import("../components/ui/card/index")['Card']>
export const LazyCardAction: LazyComponent<typeof import("../components/ui/card/index")['CardAction']>
export const LazyCardContent: LazyComponent<typeof import("../components/ui/card/index")['CardContent']>
export const LazyCardDescription: LazyComponent<typeof import("../components/ui/card/index")['CardDescription']>
export const LazyCardFooter: LazyComponent<typeof import("../components/ui/card/index")['CardFooter']>
export const LazyCardHeader: LazyComponent<typeof import("../components/ui/card/index")['CardHeader']>
export const LazyCardTitle: LazyComponent<typeof import("../components/ui/card/index")['CardTitle']>
export const LazyButton: LazyComponent<typeof import("../components/ui/button/index")['Button']>
export const LazyChart: LazyComponent<typeof import("../components/ui/chart/index")['Chart']>
export const LazyCheckbox: LazyComponent<typeof import("../components/ui/checkbox/index")['Checkbox']>
export const LazyCustomButton: LazyComponent<typeof import("../components/ui/custombutton/index")['CustomButton']>
export const LazyFormInput: LazyComponent<typeof import("../components/ui/forminput/index")['FormInput']>
export const LazyInput: LazyComponent<typeof import("../components/ui/input/index")['Input']>
export const LazyLabel: LazyComponent<typeof import("../components/ui/label/index")['Label']>
export const LazyRadioGroup: LazyComponent<typeof import("../components/ui/radio-group/index")['RadioGroup']>
export const LazyRadioGroupItem: LazyComponent<typeof import("../components/ui/radio-group/index")['RadioGroupItem']>
export const LazySelect: LazyComponent<typeof import("../components/ui/select/index")['Select']>
export const LazySelectContent: LazyComponent<typeof import("../components/ui/select/index")['SelectContent']>
export const LazySelectGroup: LazyComponent<typeof import("../components/ui/select/index")['SelectGroup']>
export const LazySelectItem: LazyComponent<typeof import("../components/ui/select/index")['SelectItem']>
export const LazySelectItemText: LazyComponent<typeof import("../components/ui/select/index")['SelectItemText']>
export const LazySelectLabel: LazyComponent<typeof import("../components/ui/select/index")['SelectLabel']>
export const LazySelectScrollDownButton: LazyComponent<typeof import("../components/ui/select/index")['SelectScrollDownButton']>
export const LazySelectScrollUpButton: LazyComponent<typeof import("../components/ui/select/index")['SelectScrollUpButton']>
export const LazySelectSeparator: LazyComponent<typeof import("../components/ui/select/index")['SelectSeparator']>
export const LazySelectTrigger: LazyComponent<typeof import("../components/ui/select/index")['SelectTrigger']>
export const LazySelectValue: LazyComponent<typeof import("../components/ui/select/index")['SelectValue']>
export const LazySocialButton: LazyComponent<typeof import("../components/ui/socialbutton/index")['SocialButton']>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>>

export const componentNames: string[]
