
{
  "$schema": "https://docs.renovatebot.com/renovate-schema.json",
  "extends": [
    "config:js-lib",
    ":automergeMinor",
    ":preserveSemverRanges"
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
