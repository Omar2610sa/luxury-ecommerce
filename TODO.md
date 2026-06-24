# Translation Task TODO

## Step 1 — Project Analysis
- [ ] Enumerate all components/pages/sections received in the task context.

## Step 2 — en.json (complete file)
- [ ] Add/extend namespaces for missing UI text in the received components (LoginDialog).


## Step 3 — ar.json (complete file)
- [ ] Add/extend namespaces for missing UI text in the received components (LoginDialog).


## Step 4 — Update Components (full code, one by one)
- [ ] Update `sections/Auth/LoginDialog.tsx` to use `useTranslations('LoginDialog')`.
- [ ] Replace hardcoded visible strings/placeholders/button labels/errors with `t('...')` keys.

## Step 5 — Verification
- [ ] Ensure JSON is valid.
- [ ] Ensure Next.js i18n rules (Server vs Client imports/usages) are followed.

