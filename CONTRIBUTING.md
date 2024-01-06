# Contributing

## <a name="rules"></a> :point_right: Coding Rules

To ensure consistency throughout the source code, keep these rules in mind as you are working:

- Follow the standard practices, see [DEVELOPER.md](./docs/DEVELOPER.md#standard)
- Pre-commit hooks for formatting are being used, see
  [DEVELOPER.md](./docs/DEVELOPER.md#hooks)
- Commit guidelines are **enforced**, see [DEVELOPER.md](./docs/DEVELOPER.md#hooks)

## <a name="commit"></a> :point_right: Commit Message Guidelines

We're using [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/), which improves the readability of the **project history**.

### Commit Message Format

The message includes a **type**, a **scope** and a **subject**:

```
<type>(<scope>): <subject>
```

The **scope** is optional. It is used to provide additional contextual information and is contained within parenthesis.

Samples: (even more [samples](https://github.com/angular/angular/commits/master))

```
feat: add hat wobble
^--^  ^------------^
|     |
|     +-> Summary in present tense.
|
+-------> Type: chore, docs, feat, fix, refactor, style, or test.
```

```
docs(changelog): update changelog to beta.5
```

```
fix(release): need to depend on latest rxjs and zone.js
```

### Type

Must be one of the following:

- `feat`: (new feature for the user, not a new feature for build script)
- `fix`: (bug fix for the user, not a fix to a build script)
- `docs`: (changes to the documentation)
- `style`: (formatting, missing semi colons, etc; no production code change)
- `refactor`: (refactoring production code, eg. renaming a variable)
- `test`: (adding missing tests, refactoring tests; no production code change)
- `chore`: (updating grunt tasks etc; no production code change)

### Scope

As fit.
