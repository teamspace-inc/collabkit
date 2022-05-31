// Patched here, awaiting https://github.com/DefinitelyTyped/DefinitelyTyped/pull/60598

declare namespace google.accounts {
  // https://developers.google.com/identity/gsi/web/reference/js-reference
  namespace id {
    /**
     * Displays the One Tap prompt or the browser native credential manager
     * after the initialize() method is invoked.
     */
    function prompt(
      momentListener?: (promptMomentNotification: PromptMomentNotification) => void
    ): void;
  }
}
