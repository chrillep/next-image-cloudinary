
{
  "$schema": "https://docs.renovatebot.com/renovate-schema.json",
  "extends": [
    "config:base",
    ":automergeMinor",
    ":preserveSemverRanges",
    ":pinOnlyDevDependencies"
  ],
  "includeForks": true,
  "labels": ["dependencies"],
  "packageRules": [
    {
      "matchUpdateTypes": ["major"],
      "addLabels": ["major"]
    },
    {
      "matchUpdateTypes": ["minor"],
      "addLabels": ["minor"]
    },
    {
      "matchUpdateTypes": ["patch"],
      "addLabels": ["patch"]
    }
  ],
  "js": {
    "addLabels": ["yarn"]
  }
}
