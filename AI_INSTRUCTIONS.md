# AI Master Instruction File (AI_INSTRUCTIONS.md)

This file acts as the core system prompt and guideline for the **7awaleen Faisal Delivery Management System** project. Antigravity must automatically read and strictly adhere to these rules before executing any new tasks, writing code, or modifying the architecture.

---

## 1. Tech Stack & Tools

- **Frontend**: Next.js (App Router), TypeScript, Tailwind CSS, Redux Toolkit, Framer Motion.
- **Backend**: Node.js, Express.js (MVC Architecture).
- **Database**: MongoDB with Mongoose ODM.
- **UI Design**: Builder.io (used for UI components and visual management).
- **Middleware**: Custom API middleware for authentication, role-based access control (RBAC), and approval verification.
- **State Management**: Redux Toolkit (slices located in `src/redux/features`).

## 2. Project Context

**Project Name**: 7awaleen Faisal Delivery Management System
**Core Purpose**: A modern, photo-dependent delivery system facilitating interactions between Customers, Drivers, and Admins.

### Key Modules:

- **Driver Dashboard** (`/delivery/dashboard`): Real-time delivery tracking, earnings management, and profile settings.
- **Admin Control Panel**: Centralized hub for managing users, verifying drivers, and overseeing deliveries.
- **Delivery Proof System**: A photo-dependent workflow where drivers must upload visual proof to complete deliveries.

## 3. Coding Standards

- **Structure**:
  - Follow the existing MVC pattern in the `BackEnd`.
  - Use Next.js App Router conventions in the `7awaleenFaisal` directory.
  - Keep components modular and reusable in `src/components`.
- **UI/UX Consistency**:
  - Maintain a premium, modern aesthetic (glassmorphism, vibrant but harmonious colors, smooth transitions).
  - Use `lucide-react` for iconography.
  - Prioritize responsive design for mobile-first driver experience.
- **TypeScript**:
  - Strict type definitions for all API responses and Redux states.
  - Avoid `any` - define clear interfaces/types.
- **API Communication**:
  - Use Redux Toolkit Query (RTK Query) for frontend data fetching.
  - Ensure all sensitive endpoints are protected by `verifyToken` and role-specific middleware.

## 4. Business Logic & Roles

### User Roles:

- `CUSTOMER`: Standard user role.
- `DRIVER`: Delivery personnel.
- `ADMIN`: Platform administrator.

### Driver Registration & Approval Workflow:

Drivers must go through a registration process that requires administrative approval before they can access the dashboard or accept orders.

- **Database Flags** (`user` model):
  - `isApproved`: Boolean flag indicating if the driver has been vetted.
  - `accountStatus`: Enum indicating current application state (`PENDING`, `APPROVED`, `REJECTED`).
- **Middleware**:
  - `isDriver`: Verifies the user has the `DRIVER` role.
  - `isApprovedDriver`: Verifies that `isApproved` is `true` AND `accountStatus` is `APPROVED`.

---

> [!IMPORTANT]
> **MANDATORY**: Before starting any task, search for and read this file to ensure compliance with architectural and business requirements.
