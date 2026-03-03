# Contributing to LEP100

## Proposing a LEP
1. Create a new folder under `specs/lep100-XX/`
2. Use the RFC template in `specs/TEMPLATE.md`
3. Include: Abstract, Motivation, Specification (ABIs/events/errors), Security, Conformance tests.
4. Submit a PR and open a discussion thread on the Litho Forum.

## Style
- MUST/SHOULD/MAY keywords follow RFC 2119 conventions.
- Avoid ambiguous language.
- Prefer deterministic rules and testable requirements.

## Tests
- Add or update Lithic conformance tests under `tests/lep100-XX/`.
- Ensure CI passes.
