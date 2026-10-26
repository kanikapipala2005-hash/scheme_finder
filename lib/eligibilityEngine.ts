import schemesData from "@/data/schemes.json";
import type {
  EligibilityCheck,
  EligibilityResult,
  EligibilityStatus,
  Scheme,
  UserProfile,
  AgeGroup,
  IncomeRange,
  Occupation,
} from "./types";

export const schemes: Scheme[] = schemesData as Scheme[];

export const AGE_GROUP_RANGES: Record<AgeGroup, [number, number]> = {
  child: [0, 12],
  student: [6, 18],
  youth: [18, 35],
  adult: [36, 60],
  senior: [60, 120],
};

export const INCOME_RANGES: Record<IncomeRange, [number, number]> = {
  "<1L": [0, 100000],
  "1-2.5L": [100000, 250000],
  "2.5-5L": [250000, 500000],
  "5-8L": [500000, 800000],
  ">8L": [800000, Infinity],
};

export function getIncomeMidpoint(range: IncomeRange): number {
  const [min, max] = INCOME_RANGES[range];
  if (max === Infinity) return min + 100000;
  return Math.round((min + max) / 2);
}

export function getRepresentativeAge(ageGroup: AgeGroup): number {
  const [min, max] = AGE_GROUP_RANGES[ageGroup];
  return Math.round((min + max) / 2);
}

function checkRule(
  passed: boolean,
  passDetail: string,
  failDetail: string
): EligibilityCheck {
  return {
    rule: passDetail.replace(/^[✓✗]\s/, ""),
    passed,
    detail: passed ? `✓ ${passDetail.replace(/^[✓✗]\s/, "")}` : `✗ ${failDetail.replace(/^[✓✗]\s/, "")}`,
  };
}

function checkPartial(detail: string): EligibilityCheck {
  return {
    rule: detail.replace(/^[?]\s/, ""),
    passed: null,
    detail: `? ${detail.replace(/^[?]\s/, "")}`,
  };
}

export function checkEligibility(
  userProfile: UserProfile,
  scheme: Scheme
): EligibilityResult {
  const checks: EligibilityCheck[] = [];
  let totalRules = 0;
  let passedRules = 0;
  let failedRules = 0;

  const age = getRepresentativeAge(userProfile.ageGroup);
  const income = getIncomeMidpoint(userProfile.incomeRange);

  const criteria = scheme.eligibilityCriteria;

  // Age check
  if (criteria.minAge != null || criteria.maxAge != null) {
    totalRules++;
    const min = criteria.minAge;
    const max = criteria.maxAge;
    if (min != null && age < min) {
      checks.push(
        checkRule(
          false,
          `Age ${age} meets minimum ${min} requirement`,
          `Age ${age} is below minimum required age of ${min}`
        )
      );
      failedRules++;
    } else if (max != null && age > max) {
      checks.push(
        checkRule(
          false,
          `Age ${age} is within ${min ?? 0}-${max} range`,
          `Age ${age} exceeds maximum age of ${max}`
        )
      );
      failedRules++;
    } else {
      const rangeText = `${min ?? "any"}-${max ?? "any"}`;
      checks.push(
        checkRule(true, `Age ${age} fits the ${rangeText} requirement`, "")
      );
      passedRules++;
    }
  }

  // Income check
  if (criteria.incomeMax != null) {
    totalRules++;
    if (income > criteria.incomeMax) {
      checks.push(
        checkRule(
          false,
          `Income ~₹${income.toLocaleString("en-IN")} within limit ₹${criteria.incomeMax.toLocaleString("en-IN")}`,
          `Estimated income ~₹${income.toLocaleString("en-IN")} exceeds limit of ₹${criteria.incomeMax.toLocaleString("en-IN")}`
        )
      );
      failedRules++;
    } else {
      checks.push(
        checkRule(
          true,
          `Estimated income ~₹${income.toLocaleString("en-IN")} within limit ₹${criteria.incomeMax.toLocaleString("en-IN")}`,
          ""
        )
      );
      passedRules++;
    }
  }

  // Occupation check
  if (criteria.occupation && criteria.occupation.length > 0) {
    totalRules++;
    if (criteria.occupation.includes(userProfile.occupation)) {
      checks.push(
        checkRule(
          true,
          `Occupation "${userProfile.occupation}" is eligible`,
          ""
        )
      );
      passedRules++;
    } else {
      checks.push(
        checkRule(
          false,
          `Occupation "${userProfile.occupation}" is eligible`,
          `Occupation "${userProfile.occupation}" not in eligible list (${criteria.occupation.join(", ")})`
        )
      );
      failedRules++;
    }
  }

  // Category check
  if (criteria.category && criteria.category.length > 0) {
    totalRules++;
    if (criteria.category.includes(userProfile.category)) {
      checks.push(
        checkRule(
          true,
          `Category "${userProfile.category}" is eligible`,
          ""
        )
      );
      passedRules++;
    } else {
      checks.push(
        checkRule(
          false,
          `Category "${userProfile.category}" is eligible`,
          `Category "${userProfile.category}" not in eligible list (${criteria.category.join(", ")})`
        )
      );
      failedRules++;
    }
  }

  // Gender check
  if (criteria.gender && criteria.gender.length > 0) {
    totalRules++;
    if (userProfile.gender === "na") {
      checks.push(
        checkPartial(
          `? Gender not provided — scheme targets ${criteria.gender.join(", ")}`
        )
      );
    } else if (criteria.gender.includes(userProfile.gender)) {
      checks.push(
        checkRule(true, `Gender "${userProfile.gender}" is eligible`, "")
      );
      passedRules++;
    } else {
      checks.push(
        checkRule(
          false,
          `Gender "${userProfile.gender}" is eligible`,
          `Scheme targets ${criteria.gender.join(", ")}; selected "${userProfile.gender}"`
        )
      );
      failedRules++;
    }
  }

  // Location check
  if (criteria.location && criteria.location.length > 0) {
    totalRules++;
    if (criteria.location.includes(userProfile.location)) {
      checks.push(
        checkRule(
          true,
          `${userProfile.location === "rural" ? "Rural" : "Urban"} location matches requirement`,
          ""
        )
      );
      passedRules++;
    } else {
      const needed = criteria.location.join(" / ");
      checks.push(
        checkRule(
          false,
          `Location matches requirement`,
          `Scheme requires ${needed} location; you selected ${userProfile.location}`
        )
      );
      failedRules++;
    }
  }

  // BPL card check
  if (criteria.bplCard === true) {
    totalRules++;
    if (userProfile.hasBplCard) {
      checks.push(
        checkRule(true, `BPL card held — requirement satisfied`, "")
      );
      passedRules++;
    } else {
      checks.push(
        checkRule(
          false,
          `BPL card held`,
          `Scheme requires a BPL card; you indicated you do not have one`
        )
      );
      failedRules++;
    }
  }

  // Owns pucca house check (scheme requires NOT owning one)
  if (criteria.ownsPuccaHouse === false) {
    totalRules++;
    if (!userProfile.ownsPuccaHouse) {
      checks.push(
        checkRule(
          true,
          `No pucca house owned — requirement satisfied`,
          ""
        )
      );
      passedRules++;
    } else {
      checks.push(
        checkRule(
          false,
          `No pucca house owned`,
          `Scheme is for families without a pucca house; you indicated ownership`
        )
      );
      failedRules++;
    }
  }

  // Determine status
  let status: EligibilityStatus;
  if (failedRules === 0 && checks.some((c) => c.passed === null)) {
    status = "more-info-required";
  } else if (failedRules === 0) {
    status = "potentially-eligible";
  } else if (failedRules === totalRules) {
    status = "not-met";
  } else {
    // Some rules failed — if the failures are "soft" (e.g. missing info only),
    // mark more-info. Otherwise not-met.
    const hardFailures = checks.filter(
      (c) => c.passed === false
    ).length;
    if (hardFailures > 0) {
      status = "not-met";
    } else {
      status = "more-info-required";
    }
  }

  const score = totalRules > 0 ? Math.round((passedRules / totalRules) * 100) : 100;

  return { status, score, checks };
}

export function evaluateAllSchemes(
  userProfile: UserProfile
): Array<{ scheme: Scheme; result: EligibilityResult }> {
  return schemes.map((scheme) => ({
    scheme,
    result: checkEligibility(userProfile, scheme),
  }));
}

export function getUniqueDocuments(schemeIds: string[]): string[] {
  const docs = new Set<string>();
  for (const id of schemeIds) {
    const scheme = schemes.find((s) => s.id === id);
    if (scheme) {
      scheme.requiredDocuments.forEach((doc) => docs.add(doc));
    }
  }
  return Array.from(docs).sort();
}

export const CATEGORY_LABELS: Record<string, string> = {
  education: "Education",
  healthcare: "Healthcare",
  agriculture: "Agriculture",
  employment: "Employment",
  housing: "Housing",
  "social-welfare": "Social Welfare",
};

export const CATEGORY_LABELS_HINDI: Record<string, string> = {
  education: "शिक्षा",
  healthcare: "स्वास्थ्य",
  agriculture: "कृषि",
  employment: "रोज़गार",
  housing: "आवास",
  "social-welfare": "सामाजिक कल्याण",
};

export const OCCUPATION_LABELS: Record<Occupation, string> = {
  student: "Student",
  farmer: "Farmer",
  unemployed: "Unemployed",
  "self-employed": "Self-Employed",
  labour: "Labour",
  salaried: "Salaried",
  homemaker: "Homemaker",
  retired: "Retired",
};
