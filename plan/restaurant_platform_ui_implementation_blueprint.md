# Restaurant Platform --- UI Implementation Blueprint

## Agent execution specification

**Document purpose:** This document is the implementation contract for
an AI coding agent building the approved user interface of the
restaurant operations platform. Follow the approved screen inventory,
role boundaries, responsive requirements, workflows, design system, and
business rules below. Do not redesign, simplify away, or invent product
behavior without recording the gap and asking for a decision.

**Scope:** UI implementation only. The approved technology direction is
Angular + TypeScript for the frontend, with Java + Vert.x backend and
PostgreSQL. The backend architecture decision is a modular monolith.
This document defines frontend structure, UI behavior, screen coverage,
integration expectations, and acceptance criteria; it does not authorize
implementing backend business rules solely in the browser.

------------------------------------------------------------------------

# 1. Agent operating rules

1.  Read the existing repository before changing it. Identify Angular
    version, build system, routing style, installed component libraries,
    lint/test commands, existing conventions, and current design tokens.
    Do not upgrade dependencies or replace the project's architecture
    without explicit approval.
2.  Implement in small, reviewable increments. Complete one role area or
    coherent feature group at a time. Keep the application runnable
    after each increment.
3.  Treat the 111 approved screens and the decisions in this document as
    requirements, not suggestions.
4.  Reuse shared components and tokens. Do not create a different
    button, field, modal, badge, navigation pattern, or color treatment
    for each screen.
5.  Use real API contracts when available. If an endpoint is not ready,
    isolate the UI behind typed service interfaces and clearly marked
    mock fixtures. Never present fabricated transactions, payment
    confirmations, stock counts, telemetry, or revenue as real data.
6.  Enforce permissions in the UI for navigation and action visibility,
    but assume the server is authoritative. Never rely on route guards
    or hidden buttons as security.
7.  Preserve privacy boundaries. Never expose one customer's private
    payment details to another customer at the same table.
8.  Do not silently change the product rules: no takeaway, pickup, or
    delivery in the initial release; in-house dining only.
9.  Keep language, theme, palette, and responsive behavior consistent
    across all role areas.
10. When a requirement is ambiguous or absent, do not invent a
    consequential workflow. Mark it as an implementation question and
    continue only with unaffected work.
11. Do not use image generation or create substitute visual mockups.
    Implement the actual UI from the approved written specifications and
    design system.
12. Do not mark a feature complete until its screen states, responsive
    layouts, permissions, accessibility, and tests have been checked.

## Definition of done for each screen

A screen is done only when: - It is reachable through the correct role
navigation and route. - Its content, actions, labels, and status
indicators match the approved screen intent. - All required responsive
layouts are implemented explicitly, not just scaled from another
breakpoint. - Loading, default, empty, error, success, disabled,
unauthorized, and offline states are implemented where relevant. - Form
validation and destructive-action confirmation are present where
required. - Role, restaurant, branch, table, order, and payment privacy
boundaries are respected. - English, Amharic, and mixed-language modes
render without clipping or broken directionality. - Light, dark, and
active palette variants work. - Keyboard navigation, visible focus,
touch targets, contrast, and accessible labels are checked. -
Unit/component tests and relevant end-to-end flows pass. - No console
errors, broken routes, placeholder controls, or dead buttons remain.

------------------------------------------------------------------------

# 2. Product scope and role model

The platform serves restaurants, cafés, and hotel food-service
operations through one connected platform.

## Roles

1.  **Customer** --- guest-first QR-based ordering and session
    experience. No customer account/login is required for the initial
    flow.
2.  **Waiter** --- manages assigned tables, views orders, delivers ready
    items, and handles customer assistance requests.
3.  **Kitchen/Chef** --- prepares order items at assigned stations and
    reports preparation issues.
4.  **Cashier** --- manages bills, payment recording, cash drawer
    basics, receipts, refunds, and pending verification.
5.  **Manager** --- manages assigned restaurant/branch operations,
    operational staff, menu, inventory, orders, requests, and reports.
6.  **Platform Admin** --- manages platform-wide restaurants, branches,
    privileged accounts, roles/permission boundaries, palettes,
    language/locale defaults, integrations, system settings, monitoring,
    reports, audit logs, notifications, and support.

## Tenant and scope rules

-   A restaurant may have multiple branches.
-   Managers are limited to their assigned restaurant(s)/branch(es).
-   Operational staff are scoped to their assigned branch and role
    permissions.
-   Waiters see only their assigned tables and permitted order
    information.
-   Kitchen staff see only permitted stations/orders/items.
-   Cashiers are authorized for branch billing workflows, but
    customer-facing table views must not reveal another customer's
    private payment information.
-   Platform Admin has platform-wide access only according to explicit
    permissions and audit requirements.
-   Operational accounts (Waiter, Kitchen, Cashier) are created and
    managed by Managers within their permitted branch scope.
-   Platform Admin controls Manager and Platform Admin accounts and
    platform-wide permission boundaries.
-   A parent restaurant suspension must constrain its branches according
    to platform policy.
-   UI filtering is not a substitute for backend tenant isolation.

------------------------------------------------------------------------

# 3. Approved technology direction and frontend architecture

## Stack

  -----------------------------------------------------------------------
  Layer                               Approved direction
  ----------------------------------- -----------------------------------
  Frontend                            Angular + TypeScript

  Backend                             Java + Vert.x

  Database                            PostgreSQL

  API                                 REST

  Live updates                        WebSockets

  Architecture                        Modular monolith backend;
                                      feature-based modular Angular
                                      frontend
  -----------------------------------------------------------------------

Use the repository's compatible Angular version and established package
manager. Do not assume the newest Angular release is appropriate.
Confirm the actual package versions before implementing.

## Suggested Angular structure

``` text
src/app/
  core/
    auth/
    authorization/
    http/
    websocket/
    tenant-context/
    error-handling/
    services/
  shared/
    components/
    directives/
    pipes/
    models/
    utilities/
  design-system/
    tokens/
    themes/
    palettes/
    typography/
    layout/
  features/
    customer/
    waiter/
    kitchen/
    cashier/
    manager/
    platform-admin/
  app.routes.ts
```

### Architectural rules

-   Use standalone components if supported by the repository's Angular
    version and conventions.
-   Lazy-load role feature routes.
-   Keep domain-specific UI inside its feature area; shared UI belongs
    in `shared` or `design-system`.
-   Use typed models and typed API services. Avoid `any` unless
    unavoidable and documented.
-   Use Angular Signals for local/derived UI state where appropriate;
    use RxJS for asynchronous streams, HTTP, and WebSocket event flows.
-   Use Reactive Forms for complex forms and validation.
-   Centralize API error mapping, loading behavior, authentication,
    tenant/branch context, and permission checks.
-   Keep presentation components separate from data-access services.
-   Use route guards for navigation protection and permission-aware
    menus; server authorization remains authoritative.
-   Do not place business secrets, API credentials, or privileged
    integration configuration in client bundles.
-   Avoid giant role components. Each screen should be a focused route
    component composed from shared elements.
-   Use stable identifiers for lists and tables; handle pagination,
    sorting, filtering, and empty states consistently.

## Suggested route model

Use role-prefixed routes and lazy loading. Exact URL spelling can follow
repository conventions, but route ownership must remain clear:

``` text
/customer/...
/waiter/...
/kitchen/...
/cashier/...
/manager/...
/platform-admin/...
```

The QR entry flow may use a public customer route that resolves the
QR/session context. Do not require customer login for this flow.

------------------------------------------------------------------------

# 4. Shared visual design system

## Visual direction

Modern, premium, clean, practical, restaurant-appropriate. Prioritize
operational clarity and fast scanning over decoration.

## Default palette

  Token          Default value   Usage
  -------------- --------------- -------------------------------------
  Deep Emerald   `#123D32`       Primary brand/deep surfaces
  Emerald        `#1D765B`       Primary actions and selected states
  Warm White     `#F7F6F2`       App background
  White          `#FFFFFF`       Cards and surfaces
  Charcoal       `#252B28`       Primary text
  Muted Gray     `#737B76`       Secondary text
  Success        `#16834A`       Success states
  Warning        `#D28A18`       Warnings/attention
  Error          `#D04444`       Errors/destructive states
  Information    `#3478C8`       Informational states

Do not rely on color alone to communicate status. Pair status color with
text, icon, or another non-color cue.

## Configurable palettes

Platform Admin can: - Add and name palettes. - Add a description. -
Configure color values. - Preview palettes. - Duplicate palettes. -
Activate/deactivate palettes. - Assign palettes globally or to selected
restaurants. - Restore the default palette.

Palette editor must support HEX entry and color picker, light/dark
previews, accessibility contrast checks, and warnings for affected
restaurants. Semantic status colors must remain consistent and
accessible. Do not allow a palette to make text or controls unreadable.

## Typography and language

-   Inter is the primary font.
-   Noto Sans is the fallback and supports Amharic.
-   Language modes: English-only, Amharic-only, and mixed English +
    Amharic.
-   Support correct text direction and layout behavior for each mode.
    Amharic is left-to-right; do not incorrectly force RTL.
-   Mixed mode must handle bilingual labels and content without clipping
    or awkward wrapping.
-   Date, time, number, and currency formatting must respect locale
    configuration.
-   Do not overwrite restaurant-authored content when changing platform
    language defaults.
-   Customer-facing menu content may have translations. Missing
    translations should use an intentional fallback, not blank labels.

## Themes

Support: - Light - Dark - System

Remember preference per user. Customer theme behavior may use a
session/browser preference where there is no account. All components,
charts, dialogs, tables, overlays, and focus indicators must work in
both light and dark themes.

## Spacing

Use a consistent spacing scale: - XS: 4px - SM: 8px - MD: 16px - LG:
24px - XL: 32px - XXL: 48px

## Shared component library

Create and reuse accessible components for: - Buttons and icon buttons -
Text fields, password fields, text areas - Selects, searchable selects,
date/time inputs - Checkbox, radio, switch - Search and filter bars -
Cards and summary metrics - Tables, pagination, sorting, row actions -
Dialogs, drawers, popovers - Tabs, breadcrumbs, navigation and
sidebars - Status badges and progress indicators - Alerts, toasts,
inline validation and notifications - File/image upload and preview -
Empty states, skeletons, loading indicators - Charts and report
visualizations - QR/session status displays - Currency/amount displays -
Order/item status components - Confirmation dialogs for destructive
actions

Shared components must support all themes, palettes, language modes,
responsive sizes, keyboard/touch interaction, and accessible names.

------------------------------------------------------------------------

# 5. Responsive layout contract

Every screen must implement the layouts required for its role. Do not
treat responsive design as simply shrinking the desktop layout.

  Role                 Mobile     Tablet                Laptop/Desktop
  ---------------- ---------- ---------- -----------------------------
  Customer           Required   Required   Not in initial design scope
  Waiter             Required   Required   Not in initial design scope
  Kitchen            Required   Required                      Required
  Cashier            Required   Required                      Required
  Manager            Required   Required                      Required
  Platform Admin     Required   Required                      Required

### Mobile

-   Use compact headers and bottom navigation or role-appropriate mobile
    navigation.
-   Stack content vertically.
-   Convert wide tables to cards or carefully designed horizontally
    scrollable data views only when necessary.
-   Keep primary actions reachable and touch targets comfortable.
-   Use full-screen or bottom-sheet patterns for appropriate forms and
    detail panels.
-   Preserve hierarchy; do not hide critical statuses or warnings.

### Tablet

-   Use more than one column where useful.
-   Kitchen is tablet-first operationally.
-   Use split list/detail layouts where the screen supports them.
-   Keep touch-friendly controls and readable information density.
-   Avoid desktop tables that become too compressed.

### Laptop/Desktop

Required for Kitchen, Cashier, Manager, and Platform Admin: - Use
persistent role navigation/sidebar where specified. - Use top navigation
for global search, notifications, and profile where appropriate. - Use
wider tables, multi-column workspaces, side detail panels, charts, and
management controls. - Use the available width intentionally; do not
merely stretch mobile cards. - Support larger desktop screens without
excessively wide text lines or unbounded tables.

------------------------------------------------------------------------

# 6. Global business rules the UI must preserve

## Customer ordering and table sessions

-   QR code identifies restaurant, branch, table, and session context.
-   Customer is guest-first; no login is required.
-   In-house dining only in the initial release. No takeaway, pickup, or
    delivery workflows.
-   Customers order directly; waiter approval is not required to submit
    an order.
-   Multiple ordering rounds are allowed during one table session.
-   Each customer's cart is independent, including at shared tables.
-   Customer can see a combined table-session order overview, but other
    customers' individual payment details remain private.
-   Submitted orders cannot be directly edited by the customer. Changes
    go through a waiter/authorized correction workflow.
-   Real-time availability must be respected. Unavailable items cannot
    be ordered.
-   Menu search covers item name, description, ingredients, categories,
    and dietary labels.
-   Item details may show ingredients, allergens, dietary labels, spice
    level, portion, nutrition, and preparation time when configured.
-   Missing allergen information must never imply allergen-free.
-   Service mode is configurable by branch/area: waiter delivery,
    self-service collection, or hybrid. This is in-house service only,
    not takeaway/delivery logistics.
-   Waiter help requests are supported.
-   Post-session history is read-only by default for 24 hours.

## Bills, payments, tax, receipts

-   Support combined and individual bill views/payments.
-   No in-app split-bill feature.
-   Cashier may record coordinated/external partial payments against a
    bill where permitted.
-   Payment policy is configurable: pay at end, before preparation, and
    online where supported.
-   Menu prices are tax-inclusive. Bill displays the included tax
    breakdown; never add tax again.
-   No service charge in the initial release.
-   Payment methods are branch/platform-configured: cash, POS/card, bank
    transfer, mobile money, and online where enabled. Do not assume
    every branch has every method.
-   Confirmed payment, failed payment, and pending verification are
    distinct.
-   Offline/external payments must remain **Pending Verification** until
    verified; never mark paid prematurely.
-   Cashier supports physical receipt printing and digital receipts;
    customer may receive printed, digital, or both according to
    preference and configuration.
-   Cash drawer tracking is basic: opening balance, cash received, cash
    refunds, expected/actual closing balance. No full expense/transfer
    management.
-   Cashier offline support is limited to viewing cached bill/order
    details and payment history, and recording externally completed
    payments as Pending Verification. Reconcile after reconnect.

## Staff, roles, and permissions

-   Manager creates/manages Waiter, Kitchen, and Cashier accounts within
    assigned branches; can edit, deactivate/reactivate, reset passwords,
    and assign operational roles/permissions within Platform Admin
    limits.
-   Platform Admin controls Manager and Platform Admin accounts and
    global permission boundaries.
-   Managers cannot change platform-wide settings or view sensitive
    integration credentials.
-   Platform Admin permission changes must not permit privilege
    escalation beyond platform policy.
-   Account state, role, assignment, and permissions must be clearly
    distinguished.

## Kitchen workflow

-   Kitchen sees only permitted stations and their items.
-   Preparation is tracked at item level.
-   Multi-station orders track each item/station independently.
-   Overall order becomes Ready only when all required items are ready.
-   Customizations, special instructions, and allergy information are
    prominent.
-   Kitchen issue reports do not silently cancel an order. Authorized
    staff resolve the issue.
-   Waiter sees ready items and delivery status, not payment details.

## Inventory

-   Keep inventory practical and restaurant-operational, not a complex
    warehouse/procurement system.
-   Monitor ingredient stock, low-stock alerts, received stock, usage,
    shortages, and discrepancies.
-   Record stock received and stock adjustments with reason/audit trail.
-   Never fabricate inventory figures.

## Integrations and sensitive settings

-   Platform Admin controls integration configuration, credentials, and
    platform-wide availability.
-   API integrations may include payment gateways, receipt printers, and
    future accounting/other systems.
-   Secrets must be masked and never exposed to Managers or operational
    staff.
-   Separate sandbox and production environments where supported.
-   Saving credentials/configuration must not silently activate an
    integration.
-   Provide test-connection feedback and audit configuration changes.

------------------------------------------------------------------------

# 7. Role navigation and screen inventory

Implement every screen listed below. Screen IDs are stable acceptance
references. Use the existing approved screen details from the design
phase as the source of truth for exact content and interaction. The
purpose summaries here are an inventory index, not permission to omit
details.

## 7.1 Customer --- 18 screens (Mobile + Tablet)

Primary experience is QR-based, guest-first, and customer-facing.

  ----------------------------------------------------------------------------------------
  ID                      Screen                  Implementation focus
  ----------------------- ----------------------- ----------------------------------------
  C01                     QR Entry / Session      Resolve QR,
                          Validation              restaurant/branch/table/session,
                                                  invalid/expired session states

  C02                     Menu Home               Restaurant identity, menu discovery,
                                                  featured/available items

  C03                     Category Listing        Browse category items and availability

  C04                     Search Results          Search menu names, descriptions,
                                                  ingredients, categories, dietary labels

  C05                     Item Details            Item description, price, ingredients,
                                                  allergen/dietary data where configured

  C06                     Item Customization      Options, modifiers, quantity, special
                                                  instructions, validation

  C07                     Cart                    Customer's independent cart, quantities,
                                                  remove/edit before submission

  C08                     Order Review            Confirm order contents, table/session
                                                  context, payment policy

  C09                     Order Confirmation      Submitted order acknowledgement and
                                                  reference

  C10                     My Orders               Current customer's orders and item/order
                                                  progress

  C11                     Order Details           Item-level details, customizations,
                                                  status and authorized change guidance

  C12                     Session Overview        Combined table-session activity without
                                                  exposing other customers' private
                                                  payments

  C13                     Waiter Assistance       Request
                                                  bill/help/cutlery/water/napkins/other;
                                                  optional message and status

  C14                     Payment / Bill View     Individual or combined bill view;
                                                  tax-inclusive breakdown; privacy

  C15                     Payment Result          Confirmed, failed, or pending result;
                                                  never infer success

  C16                     Receipt                 Digital receipt access and payment/bill
                                                  details permitted to customer

  C17                     Feedback                Optional feedback, anonymous where
                                                  configured

  C18                     Session Ended           Read-only session end state and
                                                  permitted history access
  ----------------------------------------------------------------------------------------

Customer-specific requirements: - QR/session validation must precede
session-specific menu/order actions. - Do not introduce customer
registration or login as a requirement. - Do not merge different
customers' carts. - The table overview may show shared order activity
but not other customers' private payment details. - Submitted orders
cannot be directly edited. - Display real-time unavailable state and
prevent adding unavailable items. - Respect branch-configured service
mode. - Support read-only history for the configured post-session period
(default 24 hours).

## 7.2 Waiter --- 13 screens (Mobile + Tablet)

Waiter primary navigation has exactly three operational sections: **My
Tables**, **Ready for Delivery**, and **Customer Requests**. Other
functions are secondary or accessible from profile/menu as appropriate.

  -----------------------------------------------------------------------
  ID                      Screen                  Implementation focus
  ----------------------- ----------------------- -----------------------
  W01                     Waiter Login            Secure staff
                                                  authentication

  W02                     Waiter Dashboard        Three primary
                                                  operational sections
                                                  and urgent work

  W03                     My Tables               Assigned tables and
                                                  current table/session
                                                  states

  W04                     Table Details           Assigned table session,
                                                  customer/order overview

  W05                     Order Details           Order/item status,
                                                  special instructions,
                                                  permitted corrections
                                                  workflow

  W06                     Ready for Delivery      Items ready for waiter
                                                  delivery/collection

  W07                     Customer Requests       Incoming assistance
                                                  requests

  W08                     Handle Customer Request Assign/accept,
                                                  progress, complete, and
                                                  respond to request

  W09                     Order History           Authorized historical
                                                  orders

  W10                     Notifications           Permission-scoped
                                                  operational
                                                  notifications

  W11                     Waiter Profile          Personal profile and
                                                  preferences

  W12                     Change Password         Secure password
                                                  workflow

  W13                     Help & Support          Documentation and
                                                  support access
  -----------------------------------------------------------------------

Waiter-specific requirements: - Only assigned tables are
visible/manageable unless an explicit authorized reassignment occurs. -
Waiters can view orders and mark individual ready items delivered. -
Waiters do not see private payment details. - Waiters do not directly
edit submitted customer orders; use the authorized correction
workflow. - Waiter account creation and management are controlled by
Managers. - Keep dashboard focused on My Tables, Ready for Delivery,
Customer Requests.

## 7.3 Kitchen --- 11 screens (Mobile + Tablet + Laptop/Desktop)

Kitchen is tablet-first operationally but every screen must also have
mobile and laptop/desktop layouts.

  ------------------------------------------------------------------------
  ID                      Screen                  Implementation focus
  ----------------------- ----------------------- ------------------------
  K01                     Kitchen Login           Secure staff
                                                  authentication

  K02                     Kitchen Dashboard       Station workload,
                                                  active/ready/attention
                                                  summaries

  K03                     Kitchen Order Queue     Live order/item queue
                                                  filtered by authorized
                                                  stations

  K04                     Order Details           Full order context,
                                                  items, modifiers,
                                                  instructions, allergy
                                                  emphasis

  K05                     Item Preparation        Item-level preparation
                                                  status transitions

  K06                     Kitchen Stations        Permitted station
                                                  overview and selection

  K07                     Station Order Queue     Queue scoped to selected
                                                  station

  K08                     Report Preparation      Structured issue report;
                          Issue                   no silent cancellation

  K09                     Kitchen Notifications   Operational alerts,
                                                  filters, read state

  K10                     Kitchen Profile         Profile, preferences,
                                                  permitted information

  K11                     Change Password         Secure password workflow
  ------------------------------------------------------------------------

Kitchen-specific requirements: - Filter to assigned stations and
authorized items. - Item preparation state is independent; do not mark
whole order ready when any required item is unfinished. - Order is Ready
only when all required items are ready. - Show customization, special
instruction, and allergy information prominently. - Missing allergen
information is not equivalent to allergen-free. - Issue categories
include Ingredient Unavailable, Equipment Problem, Preparation Delay,
Item Cannot Be Prepared, Quality Problem, Other Issue. - Reporting an
issue records the problem and notifies relevant roles; it does not
itself cancel the order. - Manager controls station assignment and
kitchen account permissions. - Laptop/desktop layout must provide a
genuinely expanded queue/workspace, not just a stretched tablet screen.

## 7.4 Cashier --- 15 screens (Mobile + Tablet + Laptop/Desktop)

  -----------------------------------------------------------------------------
  ID                      Screen                  Implementation focus
  ----------------------- ----------------------- -----------------------------
  CA01                    Cashier Login           Secure branch-scoped
                                                  authentication

  CA02                    Cashier Dashboard       Confirmed payment summaries,
                                                  active bills, pending
                                                  verification, drawer overview

  CA03                    Active Bills            Unpaid/partially paid bills,
                                                  search/filter, balances

  CA04                    Bill Details            Itemized bill, included tax,
                                                  confirmed payments, pending
                                                  verification, remaining
                                                  balance

  CA05                    Process Payment         Enabled payment methods,
                                                  amount, reference,
                                                  cash/change, confirmation

  CA06                    Payment Confirmation    Confirmed/pending/failed
                                                  result and transaction
                                                  details

  CA07                    Cash Drawer             Opening balance, receipts,
                                                  refunds, expected/actual
                                                  closing, reconciliation

  CA08                    Cash Transactions       Cash receipts/refunds and
                                                  transaction details

  CA09                    Refunds                 Eligible confirmed payment,
                                                  reason, amount, approval and
                                                  method rules

  CA10                    Receipt Management      Preview, physical print,
                                                  digital delivery, reprint,
                                                  printer status

  CA11                    Payment History         Searchable transaction
                                                  history

  CA12                    Pending Verification    Offline/external payments
                                                  awaiting verification and
                                                  reconciliation

  CA13                    Notifications           Payment, drawer,
                                                  verification, printer alerts

  CA14                    Cashier Profile         Profile, branch,
                                                  language/theme/notification
                                                  preferences

  CA15                    Change Password         Secure password workflow
  -----------------------------------------------------------------------------

Cashier-specific requirements: - Display only payment methods enabled
for the branch/platform. - No in-app split bill; cashier may record
coordinated external partial payments against the bill where
permitted. - Menu prices include tax. Show included tax breakdown; never
add tax again. - No service charge initially. - Pending Verification is
separate from confirmed payment and remaining balance. - Offline mode is
limited to cached bill/order details and payment history, plus recording
external payments as Pending Verification. - Never mark an
offline/external payment paid before verification. - Support physical
receipt printer and digital receipt. Allow printed, digital, or both
according to customer preference/configuration. - Basic cash drawer
tracking only; do not add expense/transfer features. - Sales totals must
use confirmed payments; pending verification must be separately
visible. - Managers manage Cashier accounts; Platform Admin controls
integrations and credentials. - Laptop/desktop layout must support full
bill/payment workspace, wide tables, and drawer reconciliation.

## 7.5 Manager --- 27 screens (Mobile + Tablet + Laptop/Desktop)

  --------------------------------------------------------------------------------
  ID                      Screen                  Implementation focus
  ----------------------- ----------------------- --------------------------------
  M01                     Manager Login           Secure authentication

  M02                     Manager Dashboard       Assigned-branch operational
                                                  overview and attention required

  M03                     Branch Overview         Branch-specific operational
                                                  snapshot

  M04                     Branch Management       Authorized branch information
                                                  and management

  M05                     Branch Operating Hours  Periods, overnight hours,
                                                  special closures, timezone

  M06                     Table Management        Table records and
                                                  available/occupied/unavailable
                                                  states

  M07                     Floor Plan Management   Visual floor layout and table
                                                  placement/status

  M08                     Staff Management        Waiter/Kitchen/Cashier staff
                                                  list and actions

  M09                     Add Staff               Create operational staff account

  M10                     Staff Details           Staff information, role, branch,
                                                  status, activity

  M11                     Edit Staff              Edit permitted staff information

  M12                     Role & Permission       Assign roles/permissions within
                          Assignment              Platform Admin boundaries

  M13                     Menu Management         Menu item list, categories,
                                                  availability and actions

  M14                     Add Menu Item           Create item, price, photo,
                                                  description, category and
                                                  metadata

  M15                     Edit Menu Item          Update permitted item data

  M16                     Menu Categories         Create/edit/order menu
                                                  categories

  M17                     Ingredient Inventory    Ingredient stock overview and
                                                  low-stock indicators

  M18                     Stock Details           Ingredient movement, current
                                                  quantity, history

  M19                     Record Stock Received   Record received stock and
                                                  source/reference as supported

  M20                     Stock Adjustment        Adjust quantity with reason and
                                                  audit

  M21                     Low-Stock Alerts        Review and act on low-stock
                                                  conditions

  M22                     Order Monitoring        Monitor branch orders and
                                                  statuses

  M23                     Order Details           Order/item details and
                                                  authorized intervention

  M24                     Customer Requests       Monitor and coordinate customer
                                                  assistance requests

  M25                     Sales Overview          Confirmed sales and operational
                                                  summaries

  M26                     Sales Reports           Date/branch filters, analytics,
                                                  export and reconciliation

  M27                     Manager Profile /       Personal profile,
                          Settings                language/theme,
                                                  security/preferences
  --------------------------------------------------------------------------------

Manager-specific requirements: - Managers can create, edit,
deactivate/reactivate, and reset passwords for operational staff within
assigned branches. - Managers assign operational roles/permissions only
within limits set by Platform Admin. - Managers manage menu items,
prices, photos/descriptions, categories, and availability within their
scope. - Inventory remains practical and operational: stock levels,
received stock, usage/shortages, low-stock alerts, discrepancies. - No
complex warehouse/procurement system. - Manager access is limited to
assigned branch(es), unless explicitly authorized for multiple
branches. - Branch hours support multiple periods, overnight hours,
special closures, and local timezone. - Sales reporting uses confirmed
payment data; pending verification is separate. - Managers cannot view
or edit platform-wide integration credentials or platform-only
settings. - Laptop/desktop layouts must include rich management
workspaces, data tables, floor-plan tools, and reports.

## 7.6 Platform Admin --- 27 screens (Mobile + Tablet + Laptop/Desktop)

  ---------------------------------------------------------------------------------------------------------
  ID                      Screen                  Implementation focus
  ----------------------- ----------------------- ---------------------------------------------------------
  PA01                    Platform Admin Login    Secure privileged authentication; MFA if configured

  PA02                    Platform Dashboard      Platform-wide restaurant/branch/subscription/health
                                                  overview

  PA03                    Restaurant Management   Search/filter/manage platform restaurants

  PA04                    Add Restaurant          Create restaurant identity, location, defaults, plan and
                                                  initial status

  PA05                    Restaurant Details      Restaurant overview, branches, subscription and activity

  PA06                    Edit Restaurant         Edit permitted identity/contact/location/defaults

  PA07                    Branch Management       Platform-wide branch listing and authorized actions

  PA08                    Staff & Account         Platform Admin and Manager accounts; operational staff
                          Management              remain Manager-managed

  PA09                    Add Staff Account       Create Platform Admin or Manager account

  PA10                    Staff Account Details   Account, role, assignments, activity, security actions

  PA11                    Edit Staff Account      Edit permitted personal/account/assignment details

  PA12                    Role & Permission       Platform-wide role/permission boundaries and scope
                          Management              

  PA13                    Theme & Palette         Manage palettes and restaurant assignments
                          Management              

  PA14                    Palette Editor          Configure palette colors, preview, contrast validation

  PA15                    Language & Locale       English/Amharic/mixed, typography, locale defaults
                          Settings                

  PA16                    Integration Management  Manage platform/restaurant integration availability and
                                                  scope

  PA17                    Integration             Configure endpoints/credentials/environments securely
                          Configuration           

  PA18                    System Settings         Global security, notification, operational and retention
                                                  defaults

  PA19                    Platform Monitoring     API/database/auth/integration health and incidents from
                                                  actual telemetry

  PA20                    Platform Reports        Platform growth, usage, subscriptions/revenue,
                                                  integration reports

  PA21                    Audit Logs              Searchable immutable audit events and safe before/after
                                                  values

  PA22                    Notifications           Critical/security/system/integration/subscription/admin
                                                  alerts

  PA23                    Platform Admin Profile  Personal profile, preferences, account/security summary

  PA24                    Change Password         Secure privileged password change

  PA25                    Help & Support          Documentation, FAQs, submit/view support requests

  PA26                    Support Request Details Ticket summary, conversation, attachments, reply,
                                                  permitted status actions

  PA27                    Support Request         Platform-wide support request list, filters, assignment
                          Management              and status management
  ---------------------------------------------------------------------------------------------------------

Platform Admin-specific requirements: - Platform Admin controls
privileged Manager/Platform Admin accounts and global permission
boundaries. - Platform Admin can manage restaurant/branch lifecycle and
subscription information within platform policy. - Account status and
subscription status are distinct concepts. - Restaurant/branch changes
must be audited. - Palette assignment can be global or
restaurant-specific. - Language/locale defaults must not overwrite
restaurant-specific authored content or currency. - Integration
credentials are masked and never exposed to operational roles or
Managers. - Save configuration must not silently activate integration. -
Monitoring must display actual telemetry. Unknown/unavailable data must
not be presented as healthy. - Revenue reports use confirmed records and
clearly separate pending amounts. - Audit logs are immutable; sensitive
secrets/passwords must never be recorded. - Notification read state is
distinct from incident resolution; dismissing a notification does not
resolve the underlying issue. - PA25--PA27 form the support experience:
help content, ticket details, and platform support request management. -
All 27 screens require mobile, tablet, and laptop/desktop layouts.

------------------------------------------------------------------------

# 8. Important screen-level interaction patterns

## Authentication screens

-   No public registration for staff roles.
-   Provide clear validation without revealing whether a username/email
    exists.
-   Password fields are masked by default with accessible show/hide
    control.
-   Support configured MFA/verification.
-   Handle expired sessions and unauthorized access safely.
-   Password change requires current password or approved verified
    alternative, enforces configured policy, prevents prohibited reuse,
    and never logs/stores plaintext passwords.

## Tables and data lists

-   Consistent search, filters, sorting, pagination, loading skeleton,
    empty state, and error state.
-   Preserve filter state when navigating back where useful.
-   Use cards on small screens where a full table is not usable.
-   Provide accessible row actions and clear confirmation for
    destructive actions.
-   Do not fabricate row counts or summary totals.

## Forms

-   Use Reactive Forms and typed validators.
-   Mark required fields and show inline errors.
-   Keep entered values on recoverable submission failures.
-   Prevent duplicate submission while request is in flight.
-   Confirm navigation away from unsaved changes.
-   Use server validation as the final authority.
-   For currency, tax, stock, and payment amounts, use decimal-safe
    representations and locale-aware display; do not use floating-point
    arithmetic for financial calculations in the UI.

## Real-time updates

-   WebSockets are used for live order, kitchen, waiter, notification,
    and relevant dashboard updates.
-   Reconnect with bounded retry/backoff and visible connection status
    where operationally relevant.
-   Distinguish stale cached information from live information.
-   Deduplicate events and avoid duplicate notifications.
-   A real-time event must not bypass permission checks or tenant scope.
-   When reconnecting, reconcile from authoritative API state rather
    than assuming every missed event arrived.

## Confirmation and audit

-   Confirm irreversible/destructive actions.
-   Explain impact before restaurant/branch suspension, account
    deactivation, refund, stock adjustment, closing, or other
    consequential action.
-   Record authorized changes through backend audit mechanisms.
-   UI must not claim a change succeeded until the server confirms it.

------------------------------------------------------------------------

# 9. Accessibility, localization, and quality

Target WCAG 2.2 AA.

Required checks: - Semantic headings, landmarks, labels, and accessible
names. - Keyboard navigation and visible focus indicators. - Appropriate
contrast in every palette and theme. - Status is not communicated by
color alone. - Touch targets suitable for mobile/tablet use. - Dialog
focus management and escape/return behavior. - Form errors announced and
associated with fields. - Charts have text summaries or accessible data
alternatives. - Amharic/Noto Sans text does not clip; mixed bilingual
labels wrap correctly. - Responsive layouts support zoom and text
scaling. - Do not encode essential meaning only in icons.

------------------------------------------------------------------------

# 10. Implementation sequence

Follow this sequence to reduce rework.

## Stage 0 --- Repository reconnaissance

-   Inspect repository and current Angular setup.
-   Record Angular/TypeScript versions, package manager, scripts, route
    architecture, styling system, existing components, and test tooling.
-   Identify current API base configuration and environment handling.
-   Report conflicts between repository reality and this blueprint
    before changing dependencies.

## Stage 1 --- UI foundation

-   Set up tokens, typography, theme provider, palette provider,
    language provider, responsive breakpoints, and shared layout
    primitives.
-   Implement common buttons, fields, cards, tables, badges, dialogs,
    toasts, loaders, empty/error states, navigation, and page headers.
-   Add Storybook or the repository's existing component showcase only
    if compatible and already used/approved; do not add unnecessary
    tooling.
-   Test light/dark and language modes on the shared component set.

## Stage 2 --- Authentication and role shell

-   Implement shared staff authentication UI and session handling.
-   Build role route shells, sidebars/top bars/mobile navigation,
    profile menus, permission-aware navigation, and
    unauthorized/not-found handling.
-   Keep Customer QR entry separate from staff authentication.

## Stage 3 --- Customer journey

Implement C01--C18 in journey order: QR/session validation → menu
discovery → item details/customization → cart/review →
submit/confirmation → orders/session overview → assistance →
bill/payment/result/receipt → feedback/session ended. Validate
independent carts, multiple rounds, table session privacy, tax-inclusive
display, and payment states.

## Stage 4 --- Waiter operations

Implement W01--W13. Prioritize My Tables, Ready for Delivery, and
Customer Requests. Validate assigned-table scope and item-level
delivery.

## Stage 5 --- Kitchen operations

Implement K01--K11. Build live station queue and item preparation first.
Validate multi-station progress, ready aggregation, allergy prominence,
and issue reporting.

## Stage 6 --- Cashier operations

Implement CA01--CA15. Build active bills, bill details, payment,
confirmation, drawer, receipts, and pending verification. Validate
offline pending behavior and confirmed-only sales totals.

## Stage 7 --- Manager operations

Implement M01--M27. Recommended order: branch/dashboard foundations →
tables/floor plan → staff and permissions → menu → inventory →
order/request monitoring → reports → profile/settings.

## Stage 8 --- Platform Admin

Implement PA01--PA27. Recommended order: authentication/dashboard →
restaurant/branch lifecycle → privileged accounts/permissions →
palettes/localization → integrations/system settings →
monitoring/reports/audit/notifications → profile/security/support.

## Stage 9 --- Cross-role integration and regression

-   Test customer order through kitchen preparation, waiter delivery,
    cashier billing/payment, manager monitoring, and Platform Admin
    visibility.
-   Test role and branch isolation.
-   Test live updates, reconnect, offline pending verification, and
    audit trails.
-   Test all responsive layouts and theme/language combinations.
-   Verify no feature violates the business constraints in this
    document.

------------------------------------------------------------------------

# 11. Required end-to-end acceptance scenarios

1.  A customer scans a valid table QR and enters the correct
    restaurant/branch/table/session without login.
2.  Two customers at one table add items independently; neither cart is
    merged.
3.  A customer submits multiple order rounds during the same session.
4.  An unavailable item cannot be added or submitted.
5.  Kitchen sees only assigned station items and can update preparation
    item by item.
6.  An order spanning stations is not Ready until every required item is
    ready.
7.  Kitchen reports an ingredient/equipment/delay/quality issue without
    silently cancelling the order.
8.  Waiter sees only assigned tables and can mark ready items delivered.
9.  Customer assistance request appears to the authorized waiter/manager
    workflow and can be tracked to completion.
10. Customer table overview shows combined order activity but hides
    other customers' private payment details.
11. Bill displays tax included in menu prices and does not add tax a
    second time.
12. Cashier records a supported payment method and receives
    authoritative confirmation before showing Paid.
13. An externally completed payment recorded offline remains Pending
    Verification until reconciled.
14. Cashier can produce a physical receipt and/or digital receipt
    according to configuration and customer preference.
15. Cash drawer opening, receipts, refunds, expected close, and actual
    count reconcile without adding expense/transfer features.
16. Manager can manage only assigned branches and permitted operational
    staff.
17. Manager can add/edit/mark unavailable menu items and record stock
    receipt/adjustment with audit context.
18. Sales reports use confirmed payments and distinguish pending
    verification.
19. Platform Admin can manage restaurant/branch lifecycle and privileged
    accounts within permission boundaries.
20. Platform Admin can assign a palette globally or to selected
    restaurants; accessibility checks remain enforced.
21. Integration secrets are never exposed to Manager/operational roles
    and are masked in privileged UI.
22. Monitoring never reports unknown telemetry as healthy.
23. Audit log events are immutable and do not contain secrets/passwords.
24. Notification read/dismiss actions do not resolve incidents
    automatically.
25. Support tickets preserve thread history and authorized
    assignment/status changes.
26. All role screens work in required mobile/tablet/desktop layouts and
    all language/theme modes.

------------------------------------------------------------------------

# 12. Testing strategy

Use the repository's existing test stack where possible.

-   Unit tests: formatting, validators, permission predicates, status
    mapping, derived UI state.
-   Component tests: forms, loading/empty/error states, dialogs, tables,
    navigation, responsive visibility.
-   Service tests: API mapping, error handling, WebSocket
    reconnection/deduplication.
-   Route tests: authentication, role access, branch/tenant route scope.
-   End-to-end tests: critical workflows in Section 11.
-   Accessibility checks: keyboard-only, focus, contrast, labels,
    screen-reader semantics.
-   Responsive checks: representative small mobile, tablet, laptop, and
    large desktop widths.
-   Localization checks: English, Amharic, mixed mode, long labels,
    number/currency/date formatting.
-   Theme checks: light, dark, system, default palette, custom palette.

Never write tests that merely assert a mock always succeeds. Include
failure, permission denial, empty, offline, and stale-data cases.

------------------------------------------------------------------------

# 13. Agent progress reporting format

After each implementation increment, report:

1.  **Completed:** exact screen IDs/components/routes implemented.
2.  **Responsive coverage:** mobile/tablet/desktop verified for each
    applicable role.
3.  **Behavior:** workflows and states implemented.
4.  **API status:** real endpoint, typed stub, or blocked dependency;
    clearly distinguish each.
5.  **Tests:** commands run and pass/fail counts.
6.  **Known gaps:** unresolved product decisions or backend
    dependencies.
7.  **Next increment:** one concrete next unit of work.

Do not claim a screen is complete if it contains placeholder data, dead
controls, missing states, or unverified responsive behavior.

------------------------------------------------------------------------

# 14. Final implementation checklist

-   [ ] All 111 screen routes/components accounted for.
-   [ ] Customer 18 screens: mobile + tablet.
-   [ ] Waiter 13 screens: mobile + tablet.
-   [ ] Kitchen 11 screens: mobile + tablet + laptop/desktop.
-   [ ] Cashier 15 screens: mobile + tablet + laptop/desktop.
-   [ ] Manager 27 screens: mobile + tablet + laptop/desktop.
-   [ ] Platform Admin 27 screens: mobile + tablet + laptop/desktop.
-   [ ] Shared design system and default Deep Emerald + Warm Neutral
    palette implemented.
-   [ ] Configurable palettes and restaurant assignment supported.
-   [ ] English, Amharic, and mixed language modes supported.
-   [ ] Light, dark, and system themes supported.
-   [ ] Inter and Noto Sans font support verified.
-   [ ] WCAG 2.2 AA target checked.
-   [ ] Tenant, branch, role, and customer payment privacy boundaries
    verified.
-   [ ] In-house-only ordering constraint preserved.
-   [ ] Independent carts and multiple ordering rounds verified.
-   [ ] Item-level kitchen readiness and waiter delivery verified.
-   [ ] Tax-inclusive bill calculation/display verified.
-   [ ] Pending Verification never treated as Paid.
-   [ ] Physical and digital receipt workflows verified.
-   [ ] Basic cash drawer scope preserved.
-   [ ] Manager operational staff/menu/inventory scope preserved.
-   [ ] Platform Admin integration secrets and audit boundaries
    preserved.
-   [ ] Loading, empty, error, success, unauthorized, offline, and
    stale-data states covered where relevant.
-   [ ] End-to-end tests pass.
-   [ ] No dead controls, placeholder success messages, or fabricated
    live data remain.

**Final instruction to the coding agent:** Implement the approved UI
faithfully and incrementally. Prefer explicit, tested, reusable behavior
over shortcuts. Do not change the product decisions or omit a responsive
layout to save time. If a required backend capability is unavailable,
build a typed UI integration boundary and report the dependency rather
than simulating a successful real-world operation.
