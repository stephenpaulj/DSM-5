(() => {
  'use strict';
  const D = window.DSM_DATA;
  if (!D || !Array.isArray(D.entries)) return;
  const chapterNames = D.chapters.map(x => x[0]);
  const byName = (name) => D.entries.find(e => e[1].toLowerCase() === name.toLowerCase());
  const norm = (s) => String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9.]+/g, ' ').trim();
  const key = norm;
  const codebook = {
    'Intellectual Developmental Disorder (Intellectual Disability)': ['F70 · F71 · F72 · F73', 'Code is severity-specific; see the diagnostic section.'],
    'Autism Spectrum Disorder': ['F84.0', 'One classification code; support levels are specifiers.'],
    'Attention-Deficit/Hyperactivity Disorder': ['F90.0 · F90.1 · F90.2', 'Code follows presentation: inattentive, hyperactive/impulsive, or combined.'],
    'Specific Learning Disorder': ['F81.0 · F81.81 · F81.2', 'Code follows the affected academic domain.'],
    'Schizophrenia': ['F20.9', 'Course and symptom-severity specifiers may also apply.'],
    'Bipolar II Disorder': ['F31.81', 'Check the current episode and specifiers in the source.'],
    'Major Depressive Disorder': ['F32.x · F33.x', 'Single vs. recurrent episode; severity and features affect the full code.'],
    'Persistent Depressive Disorder': ['F34.1', 'Additional course and feature specifiers apply.'],
    'Premenstrual Dysphoric Disorder': ['F32.81', 'Use the source criteria and coding notes.'],
    'Separation Anxiety Disorder': ['F93.0', 'Use the classification code shown for this diagnosis.'],
    'Selective Mutism': ['F94.0', 'Use the classification code shown for this diagnosis.'],
    'Specific Phobia': ['F40.2x', 'The final code varies by phobia type; consult the printed code list.'],
    'Social Anxiety Disorder': ['F40.10', 'Performance-only is a specifier.'],
    'Panic Disorder': ['F41.0', 'Do not confuse with the panic-attack specifier.'],
    'Agoraphobia': ['F40.00', 'Use the classification code shown for this diagnosis.'],
    'Generalized Anxiety Disorder': ['F41.1', 'Use the classification code shown for this diagnosis.'],
    'Obsessive-Compulsive Disorder': ['F42.2', 'Insight and tic-related specifiers may apply.'],
    'Body Dysmorphic Disorder': ['F45.22', 'Muscle dysmorphia is a specifier.'],
    'Hoarding Disorder': ['F42.3', 'Excessive acquisition is a specifier.'],
    'Trichotillomania (Hair-Pulling Disorder)': ['F63.3', 'Use the classification code shown for this diagnosis.'],
    'Excoriation (Skin-Picking) Disorder': ['F42.4', 'Use the classification code shown for this diagnosis.'],
    'Posttraumatic Stress Disorder': ['F43.10', 'Code may be refined by the source’s coding instructions.'],
    'Acute Stress Disorder': ['F43.0', 'Use the classification code shown for this diagnosis.'],
    'Prolonged Grief Disorder': ['F43.81', 'Use the source’s current criteria and coding notes.'],
    'Dissociative Identity Disorder': ['F44.81', 'Use the classification code shown for this diagnosis.'],
    'Dissociative Amnesia': ['F44.0', 'Dissociative fugue is a specifier.'],
    'Depersonalization/Derealization Disorder': ['F48.1', 'Use the classification code shown for this diagnosis.'],
    'Somatic Symptom Disorder': ['F45.1', 'Pain and persistence specifiers may apply.'],
    'Illness Anxiety Disorder': ['F45.21', 'Care-seeking and care-avoidant types are specified.'],
    'Pica': ['F98.3 · F50.89', 'Coding differs for children and adults.'],
    'Rumination Disorder': ['F98.21', 'Use the classification code shown for this diagnosis.'],
    'Avoidant/Restrictive Food Intake Disorder': ['F50.82', 'Use the classification code shown for this diagnosis.'],
    'Anorexia Nervosa': ['F50.01 · F50.02', 'Code follows restricting vs. binge-eating/purging type.'],
    'Bulimia Nervosa': ['F50.2', 'Severity is based on the frequency of compensatory behavior.'],
    'Binge-Eating Disorder': ['F50.81', 'Severity is based on episode frequency.'],
    'Enuresis': ['F98.0', 'Nocturnal/diurnal pattern is specified.'],
    'Encopresis': ['F98.1', 'Constipation/overflow status is specified.'],
    'Insomnia Disorder': ['F51.01', 'Episode-course and co-occurring conditions may be specified.'],
    'Hypersomnolence Disorder': ['F51.11', 'Acute/subacute/persistent course and severity may be specified.'],
    'Narcolepsy': ['G47.411 · G47.419 · G47.421 · G47.429', 'Code depends on type and medical context.'],
    'Nightmare Disorder': ['F51.5', 'Use the source’s severity/course specifiers.'],
    'Oppositional Defiant Disorder': ['F91.3', 'Severity is based on settings in which symptoms occur.'],
    'Intermittent Explosive Disorder': ['F63.81', 'Use the classification code shown for this diagnosis.'],
    'Conduct Disorder': ['F91.1 · F91.2', 'Childhood- vs. adolescent-onset type; limited prosocial emotions may be specified.'],
    'Borderline Personality Disorder': ['F60.3', 'Use the classification code shown for this diagnosis.'],
    'Antisocial Personality Disorder': ['F60.2', 'Use the classification code shown for this diagnosis.'],
    'Voyeuristic Disorder': ['F65.3', 'Use the classification code shown for this diagnosis.'],
    'Exhibitionistic Disorder': ['F65.2', 'Use the classification code shown for this diagnosis.'],
    'Frotteuristic Disorder': ['F65.81', 'Use the classification code shown for this diagnosis.'],
    'Sexual Masochism Disorder': ['F65.51', 'Use the classification code shown for this diagnosis.'],
    'Sexual Sadism Disorder': ['F65.52', 'Use the classification code shown for this diagnosis.'],
    'Pedophilic Disorder': ['F65.4', 'Use the classification code shown for this diagnosis.'],
    'Fetishistic Disorder': ['F65.0', 'Use the classification code shown for this diagnosis.'],
    'Transvestic Disorder': ['F65.1', 'Use the classification code shown for this diagnosis.'],
    'Gambling Disorder': ['F63.0', 'Severity is specified in the diagnostic section.']
  };
  const guides = {
    'autism spectrum disorder': {
      overview: 'A neurodevelopmental diagnosis defined by a combination of social-communication differences and restricted or repetitive patterns of behavior, interests, or activities.',
      criteria: ['Persistent differences across social communication and interaction, including reciprocity, nonverbal communication, and developing or understanding relationships.', 'At least two kinds of restricted or repetitive behavior, such as repetition, insistence on sameness, highly focused interests, or sensory reactivity.', 'Features begin in the developmental period, though they may become more apparent when demands grow.', 'The pattern meaningfully affects everyday functioning and is not explained by developmental level alone.'],
      plain: ['Social communication can take extra effort or look different from peers.', 'Predictability, focused interests, repeated actions, or sensory differences may be important parts of the person’s experience.'],
      specifiers: ['With or without intellectual impairment', 'With or without language impairment', 'Associated genetic/medical condition or environmental factor; associated neurodevelopmental, mental, or behavioral condition; catatonia'],
      severity: 'Support levels are specified separately for social communication and restricted/repetitive behavior; the level describes current support needs, not a person’s worth or potential.',
      tags: 'social communication interaction reciprocity nonverbal relationships repetitive routines sameness interests sensory development',
      related: ['attention-deficit/hyperactivity disorder','social (pragmatic) communication disorder']
    },
    'attention-deficit/hyperactivity disorder': {
      overview: 'A persistent pattern of inattention and/or hyperactivity-impulsivity that is developmentally out of step and interferes with functioning.',
      criteria: ['Symptoms persist over time and are inconsistent with developmental level.', 'Several symptoms were present before age 12 and occur in more than one setting.', 'The pattern interferes with or reduces the quality of social, school, or work functioning.', 'Consider other conditions and context before attributing the pattern to ADHD.'],
      plain: ['Attention may drift, tasks may be hard to organize or finish, or activity and impulse control may be difficult.', 'The exact pattern differs by person and setting; a diagnosis is not based on a single behavior.'],
      specifiers: ['Predominantly inattentive, predominantly hyperactive/impulsive, or combined presentation', 'In partial remission'],
      severity: 'Current severity is specified as mild, moderate, or severe.',
      tags: 'attention distractibility focus impulsivity hyperactivity organization school work childhood executive function',
      related: ['autism spectrum disorder','specific learning disorder']
    },
    'schizophrenia': {
      overview: 'A psychotic disorder involving characteristic symptoms together with changes in functioning and a sustained course.',
      criteria: ['During an active phase, at least two characteristic symptom types are present; at least one is delusions, hallucinations, or disorganized speech.', 'The disturbance is associated with a significant change in work, relationships, or self-care.', 'Continuous signs of disturbance persist over the required overall course, including an active-phase period.', 'Mood disorders, substances, medical causes, and developmental context must be considered in the differential.'],
      plain: ['Experiences may include fixed unusual beliefs, perceptions others do not share, disorganized communication, or changes in motivation and expression.', 'The diagnosis is not synonymous with violence or a “split personality.”'],
      specifiers: ['Course specifiers after sufficient duration; catatonia; current symptom severity dimensions'],
      severity: 'The classification lists current severity dimensions; there is no single severity label that captures every person’s experience.',
      tags: 'psychosis delusions hallucinations voices disorganized speech negative symptoms cognition functioning',
      related: ['schizophreniform disorder','schizoaffective disorder','brief psychotic disorder']
    },
    'bipolar i disorder': {
      overview: 'The defining history is at least one manic episode. Depressive episodes are common but are not required to establish Bipolar I Disorder.',
      criteria: ['A distinct period of unusually elevated, expansive, or irritable mood and increased energy/activity forms a manic episode.', 'The episode includes associated changes in thinking, behavior, sleep, speech, or activity, and causes marked impairment, hospitalization, or psychotic features.', 'The episode is not better attributed to a substance or another medical condition.', 'Use the full episode and course history rather than a momentary mood change.'],
      plain: ['Mania is a sustained episode-level change in energy and mood—not simply being cheerful or energetic.', 'A careful history of duration, function, risk, and prior episodes matters.'],
      specifiers: ['Current or most recent episode; remission; psychotic features; anxious distress, mixed features, rapid cycling, melancholic/atypical features, peripartum onset, seasonal pattern, and others where applicable'],
      severity: 'The code and severity depend on the current or most recent episode and its features; consult the classification’s full code block.',
      tags: 'mania elevated mood energy sleep racing thoughts impulsive bipolar depression mood episode',
      related: ['bipolar ii disorder','major depressive disorder']
    },
    'bipolar ii disorder': {
      overview: 'A lifetime pattern of at least one hypomanic episode and at least one major depressive episode, with no history of a manic episode.',
      criteria: ['The person has experienced both a hypomanic episode and a major depressive episode.', 'There has never been a manic episode.', 'The mood episodes cause clinically significant distress or impairment; assess the complete course and exclusions.', 'Do not equate hypomania with ordinary good mood or diagnose from depression alone.'],
      plain: ['The key distinction from Bipolar I is a history of hypomania plus depression, without mania.', 'Periods of depression may be prominent; asking about past periods of increased energy and changed behavior is important.'],
      specifiers: ['Current or most recent episode; remission and severity; anxious distress, mixed features, rapid cycling, peripartum onset, seasonal pattern, and others as applicable'],
      severity: 'Major-depressive-episode severity is specified when full criteria are currently met.',
      tags: 'hypomania depression mood episode energy bipolar low mood elevated mood',
      related: ['bipolar i disorder','major depressive disorder']
    },
    'major depressive disorder': {
      overview: 'One or more major depressive episodes, assessed in context of the person’s history, functioning, and possible alternative explanations.',
      criteria: ['A cluster of depressive symptoms occurs together during the same episode period; depressed mood or loss of interest/pleasure is central.', 'The episode represents a change and causes clinically significant distress or impairment.', 'Substance effects, medical causes, and any history of mania or hypomania must be considered.', 'Record single vs. recurrent episode, severity, remission status, and applicable specifiers.'],
      plain: ['Depression can affect mood, motivation, sleep, appetite, concentration, energy, and self-evaluation; the pattern and impact matter.', 'A difficult week by itself does not establish a disorder.'],
      specifiers: ['Single or recurrent episode; severity; psychotic features; partial/full remission; anxious distress, mixed, melancholic/atypical, catatonia, peripartum onset, seasonal pattern, and others'],
      severity: 'Mild, moderate, or severe; psychotic features and remission status further describe the episode.',
      tags: 'depression low mood sadness anhedonia loss of interest sleep appetite guilt energy concentration hopelessness',
      related: ['persistent depressive disorder','bipolar ii disorder']
    },
    'persistent depressive disorder': {
      overview: 'A chronic depressive presentation in which depressed mood is present over a prolonged course, with additional symptoms and functional impact.',
      criteria: ['Depressed mood is present for a prolonged period—at least two years in adults, or one year in children and adolescents.', 'Additional depressive symptoms accompany the mood pattern, and symptom-free intervals do not exceed the limits in the criteria.', 'The pattern causes distress or impairment and is not better explained by mania, substances, or a medical condition.', 'Specify onset, remission pattern, associated features, and current severity.'],
      plain: ['The emphasis is on a long-running pattern rather than one isolated episode.', 'The person’s baseline, duration, and periods of relief help distinguish the course.'],
      specifiers: ['Early/late onset; persistent major episode or intermittent episodes; pure dysthymic syndrome; remission; anxious distress and atypical features'],
      severity: 'Current severity is specified as mild, moderate, or severe.',
      tags: 'chronic depression low mood persistent dysthymia long term sadness',
      related: ['major depressive disorder']
    },
    'panic disorder': {
      overview: 'Recurrent unexpected panic attacks followed by ongoing concern about further attacks or a significant change in behavior.',
      criteria: ['The person experiences recurrent, unexpected panic attacks: abrupt surges of intense fear or discomfort with physical and cognitive symptoms.', 'At least one attack is followed by a sustained period of worry about more attacks or their consequences, or by a maladaptive behavior change.', 'Assess substance, medical, and other psychiatric explanations.', 'A panic attack is a specifier that can occur in many disorders; it is not itself Panic Disorder.'],
      plain: ['A panic attack can feel intensely physical—such as a pounding heart, breathlessness, dizziness, or fear of losing control.', 'The diagnosis depends on the recurring pattern and what follows, not just one frightening episode.'],
      specifiers: ['The DSM-5-TR chapter includes a separate panic-attack specifier for use with other diagnoses.'],
      severity: 'No separate severity scale is listed in this overview; use the criteria page and clinical context.',
      tags: 'panic sudden fear heart racing breathless dizziness attack fear losing control unexpected',
      related: ['agoraphobia','generalized anxiety disorder']
    },
    'generalized anxiety disorder': {
      overview: 'Excessive, difficult-to-control worry across a range of events or activities, accompanied by other symptoms and meaningful distress or impairment.',
      criteria: ['Worry occurs more days than not over a sustained period and spans multiple areas of life.', 'The person finds the worry difficult to control.', 'Associated symptoms—such as restlessness, fatigue, concentration difficulty, irritability, muscle tension, or sleep disturbance—are present.', 'The pattern is not better explained by a substance, medical condition, or another mental disorder.'],
      plain: ['Worry feels broad, persistent, and hard to switch off, rather than being limited to one specific trigger.', 'The associated tension, restlessness, and sleep or concentration problems can be as disruptive as the worry itself.'],
      specifiers: ['The source criteria specify the symptom pattern and differential considerations; no additional specifier is listed here.'],
      severity: 'Consult the criteria page for full duration and symptom-count requirements.',
      tags: 'worry anxiety excessive difficult to control restlessness fatigue concentration irritability muscle tension sleep',
      related: ['panic disorder','social anxiety disorder']
    },
    'obsessive-compulsive disorder': {
      overview: 'Obsessions, compulsions, or both that are time-consuming or cause significant distress or impairment.',
      criteria: ['Obsessions are recurring unwanted thoughts, urges, or images; compulsions are repeated actions or mental acts performed in response to them or to rigid rules.', 'The experiences take substantial time or cause clinically significant distress or impairment.', 'Consider substances, medical conditions, and other disorders that may better explain the symptoms.', 'Specify the person’s level of insight and whether the presentation is tic-related.'],
      plain: ['An intrusive thought is not the same as an intention; repetitive actions may briefly reduce distress but become difficult to stop.', 'The meaning, function, time burden, and impairment of the pattern matter.'],
      specifiers: ['With good/fair insight, poor insight, or absent insight/delusional beliefs; tic-related'],
      severity: 'The core criteria do not use the mild/moderate/severe scale in this guide; record insight and functional impact.',
      tags: 'obsessions compulsions intrusive thoughts rituals checking washing symmetry contamination repetitive insight',
      related: ['body dysmorphic disorder','hoarding disorder']
    },
    'posttraumatic stress disorder': {
      overview: 'A trauma-related disorder with a characteristic pattern of re-experiencing, avoidance, changes in cognition/mood, and heightened reactivity after qualifying exposure.',
      criteria: ['There is exposure to actual or threatened death, serious injury, or sexual violence in a manner specified by the criteria.', 'Symptoms occur across the required clusters: intrusion, avoidance, negative changes in cognition/mood, and arousal/reactivity.', 'The disturbance lasts longer than one month and causes clinically significant distress or impairment.', 'Rule out substance/medical causes; specify dissociative symptoms or delayed expression when applicable.'],
      plain: ['A reminder can bring back the event as if it is happening now; people may avoid reminders or feel persistently unsafe, detached, or on edge.', 'A traumatic event alone does not automatically mean PTSD.'],
      specifiers: ['With dissociative symptoms; with delayed expression; the manual also has a separate preschool criteria set for younger children.'],
      severity: 'No single severity level is summarized here; note symptom clusters, course, and functional impact.',
      tags: 'trauma intrusive memories nightmares flashbacks avoidance hypervigilance startle guilt numbness',
      related: ['acute stress disorder','adjustment disorders']
    },
    'acute stress disorder': {
      overview: 'A short-window trauma-related diagnosis for significant post-trauma symptoms occurring from three days up to one month after exposure.',
      criteria: ['A qualifying traumatic exposure is followed by symptoms drawn from intrusion, negative mood, dissociation, avoidance, and arousal.', 'The required symptom threshold and clinically significant distress or impairment are assessed using the official criteria.', 'The time window is three days to one month after the trauma; symptoms continuing beyond that point call for reassessment.', 'Consider medical/substance causes and other trauma-related diagnoses.'],
      plain: ['The main distinction from PTSD in this manual is the time window, alongside the symptom criteria.', 'The label should not be used to minimize or predict an individual’s later course.'],
      specifiers: ['See the criteria set for required symptom grouping and recording.'],
      severity: 'No separate severity scale is summarized here.',
      tags: 'trauma acute stress intrusion avoidance dissociation arousal recent event',
      related: ['posttraumatic stress disorder','adjustment disorders']
    },
    'anorexia nervosa': {
      overview: 'An eating disorder involving restriction of energy intake, significantly low body weight in context, fear or behavior that interferes with weight gain, and disturbance in body-weight/shape experience.',
      criteria: ['Energy intake is restricted relative to requirements, leading to significantly low body weight for age, sex, development, and physical health.', 'There is intense fear of gaining weight or persistent behavior that interferes with weight gain.', 'Body image, self-evaluation, or recognition of the seriousness of low weight is disturbed.', 'Specify restricting or binge-eating/purging type, remission status, and current severity.'],
      plain: ['The diagnosis is not defined by appearance alone; growth, medical context, behavior, and the person’s relationship with weight and shape all matter.', 'Medical risk can be serious at any body size and needs professional assessment.'],
      specifiers: ['Restricting type; binge-eating/purging type; partial/full remission'],
      severity: 'The DSM severity framework uses body-mass index for adults and corresponding growth percentiles for children/adolescents; consult the full criteria and clinical context.',
      tags: 'eating restriction low weight fear weight gain body image food restriction binge purge',
      related: ['bulimia nervosa','avoidant/restrictive food intake disorder']
    },
    'bulimia nervosa': {
      overview: 'Recurrent binge-eating episodes paired with inappropriate compensatory behavior, with self-evaluation unduly influenced by body shape and weight.',
      criteria: ['Binge episodes involve both an unusually large amount of food in a discrete period and a sense of loss of control.', 'Compensatory behaviors recur to prevent weight gain.', 'The binge/compensation pattern occurs at least weekly for three months and shape/weight unduly influences self-evaluation.', 'The pattern does not occur exclusively during anorexia nervosa.'],
      plain: ['A binge is defined by both amount and loss of control; feeling that one ate “too much” alone is not enough.', 'Compensatory behavior can be hidden, and weight alone does not establish or rule out the diagnosis.'],
      specifiers: ['The criteria set includes remission and severity specifiers.'],
      severity: 'Severity is based on the average weekly frequency of inappropriate compensatory behavior; check the source for bands.',
      tags: 'binge eating loss of control vomiting laxatives compensatory behavior body shape weight',
      related: ['binge-eating disorder','anorexia nervosa']
    },
    'binge-eating disorder': {
      overview: 'Recurrent binge-eating episodes that cause marked distress, without regular compensatory behavior characteristic of bulimia nervosa.',
      criteria: ['Binge episodes include unusually large intake in a discrete period and a sense of loss of control.', 'Several associated features are present, such as rapid eating, eating past comfortable fullness, eating without hunger, eating alone due to embarrassment, or later disgust/depression/guilt.', 'Episodes occur at least weekly for three months and cause marked distress.', 'There is no regular inappropriate compensatory behavior and the pattern does not occur exclusively during bulimia nervosa or anorexia nervosa.'],
      plain: ['Loss of control and distress are central; the pattern is not simply overeating at a meal.', 'The absence of regular compensatory behavior helps distinguish it from bulimia nervosa.'],
      specifiers: ['Remission and severity specifiers are available.'],
      severity: 'Severity is based on binge episodes per week; consult the full source for exact bands.',
      tags: 'binge eating loss of control distress eating past fullness secret eating guilt no compensation',
      related: ['bulimia nervosa','anorexia nervosa']
    },
    'insomnia disorder': {
      overview: 'Persistent dissatisfaction with sleep quantity or quality because of difficulty falling asleep, staying asleep, or returning to sleep after early awakening, with daytime consequences.',
      criteria: ['A sleep complaint involves initiation, maintenance, or early-morning awakening.', 'The difficulty occurs despite adequate opportunity and circumstances for sleep.', 'It causes meaningful distress or daytime impairment.', 'The pattern occurs at least three nights a week for at least three months and is not better explained by another sleep-wake disorder or substance/medical cause.'],
      plain: ['The issue is not simply a busy night; adequate opportunity, persistence, and impact during the day matter.', 'Sleep diaries and medical review may help distinguish causes.'],
      specifiers: ['Episodic, persistent, or recurrent; with mental disorder, medical condition, or another sleep disorder.'],
      severity: 'The source includes course specifiers; individual impact is also important.',
      tags: 'sleep insomnia trouble falling asleep staying asleep waking tired fatigue daytime sleep',
      related: ['hypersomnolence disorder','circadian rhythm sleep-wake disorders']
    },
    'alcohol use disorder': {
      overview: 'A problematic pattern of alcohol use leading to clinically significant impairment or distress, evaluated over a 12-month period.',
      criteria: ['The official criteria assess impaired control, social impairment, risky use, and pharmacological features.', 'At least two criteria within a 12-month period are required; severity follows the number met.', 'Consider intoxication, withdrawal, medication effects, and medical consequences separately as the source directs.', 'Use remission and controlled-environment specifiers where applicable.'],
      plain: ['The diagnosis is about a pattern and its consequences, not a moral judgment or a single episode.', 'A person can have serious alcohol-related harm even when others do not notice it.'],
      specifiers: ['Severity and remission status; the manual separately classifies intoxication, withdrawal, and alcohol-induced disorders.'],
      severity: 'Mild: 2–3 criteria; moderate: 4–5; severe: 6 or more. Confirm against the criteria page.',
      tags: 'alcohol drinking craving tolerance withdrawal drinking consequences substance use',
      related: ['cannabis use disorder','opioid use disorder']
    },
    'borderline personality disorder': {
      overview: 'A pervasive pattern of instability in relationships, self-image, and affect, together with marked impulsivity, beginning by early adulthood and present across contexts.',
      criteria: ['The broader pattern is enduring and inflexible, causes distress or impairment, and is not better accounted for by another condition or context.', 'The DSM criteria describe nine features across relationship instability, abandonment sensitivity, identity, impulsivity, self-harm/suicidality, affect, emptiness, anger, and stress-related paranoia/dissociation.', 'At least five of the listed features are required, assessed in the full clinical picture.', 'Consider developmental, cultural, and situational context; do not use the label from one crisis or behavior alone.'],
      plain: ['Emotional intensity, fear of abandonment, unstable self-experience, and impulsive responses can be part of the pattern.', 'People with this diagnosis can and do improve; it is not a character judgment.'],
      specifiers: ['This categorical entry does not add a separate specifier in this study note; see the alternative Section III model for trait detail.'],
      severity: 'No single severity level is included in the categorical entry.',
      tags: 'personality relationships abandonment identity impulsivity self harm emotion anger emptiness dissociation',
      related: ['antisocial personality disorder','avoidant personality disorder']
    }
  };
  const guidesByKey = Object.fromEntries(Object.entries(guides).map(([k,v]) => [key(k),v]));
  const entries = D.entries.map((r,i) => ({ id:`e${i}`, index:i, chapterIndex:r[0], title:r[1], page:r[2], code:r[3] || '', kind:r[4] || 'entry' }));
  const chapterOf = e => chapterNames[e.chapterIndex] || 'Other DSM-5-TR material';
  const guideOf = e => guidesByKey[key(e.title)] || null;
  const codeOf = e => codebook[e.title] || (e.code ? [e.code,'Shown on the classification line.'] : null);
  const root = document.getElementById('routeRoot');
  const search = document.getElementById('globalSearch');
  const suggest = document.getElementById('searchSuggestions');
  const toast = document.createElement('div'); toast.className='toast'; document.body.appendChild(toast);
  let toastTimer;
  const safeGet = (k, fallback) => { try { const x=localStorage.getItem(k); return x ? JSON.parse(x) : fallback; } catch { return fallback; } };
  const safeSet = (k,v) => { try { localStorage.setItem(k,JSON.stringify(v)); } catch {} };
  let recent = safeGet('mindfulAtlasRecent',[]).filter(i => Number.isInteger(i) && entries[i]);
  let compareIds = safeGet('mindfulAtlasCompare',[]).filter(id => entries.some(e=>e.id===id)).slice(0,3);
  let flashDeck = [], flashPos = 0, flipped = false, currentCase = '';
  let libState = { q:'', chapter:'all', page:0 };
  const iconDots = ['#c5bdea','#b8dec9','#f2cdbb','#c9dcf1','#eed3dc','#e9d99e'];
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const toastMsg = (s) => { toast.textContent=s; toast.classList.add('show'); clearTimeout(toastTimer); toastTimer=setTimeout(()=>toast.classList.remove('show'),2300); };
  const entryById = id => entries.find(e=>e.id===id);
  const hrefEntry = e => `#/entry/${e.id}`;
  const chapterItems = (idx) => entries.filter(e=>e.chapterIndex===idx);
  const currentRoute = () => { const h=location.hash || '#/home'; const parts=h.slice(2).split('/'); return {page:parts[0]||'home', arg:parts.slice(1).join('/'), full:h}; };
  const navActivate = page => { document.querySelectorAll('[data-nav]').forEach(a=>a.classList.toggle('active',a.dataset.nav===page)); };
  const closeMobile = () => { document.getElementById('sidebar').classList.remove('open'); document.getElementById('mobileScrim').classList.remove('show'); };
  function setupNav(){
    const nav=document.getElementById('chapterNav');
    nav.innerHTML=D.chapters.map((c,i)=>`<button type="button" data-chapter="${i}" title="${esc(c[0])}"><i class="chapter-dot" style="background:${iconDots[i%iconDots.length]}"></i><span>${esc(c[0])}</span></button>`).join('');
    document.getElementById('navEntryCount').textContent=String(entries.filter(e=>e.kind==='entry').length);
    document.getElementById('allChaptersBtn').addEventListener('click',()=>location.hash='#/library');
    nav.addEventListener('click',e=>{const b=e.target.closest('[data-chapter]'); if(b){closeMobile(); location.hash=`#/chapter/${b.dataset.chapter}`;}});
    document.querySelectorAll('[data-nav]').forEach(a=>a.addEventListener('click',()=>closeMobile()));
    document.querySelector('[data-route="about"]').addEventListener('click',()=>{closeMobile();location.hash='#/about';});
    document.getElementById('mobileMenu').addEventListener('click',()=>{document.getElementById('sidebar').classList.add('open');document.getElementById('mobileScrim').classList.add('show');});
    document.getElementById('mobileScrim').addEventListener('click',closeMobile);
  }
  function getSearchMatches(q,limit=12){
    const query=norm(q); if(!query) return [];
    const scored=[];
    for(const e of entries){
      const g=guideOf(e), c=codeOf(e);
      const text=norm([e.title,chapterOf(e),c?.[0],g?.overview,g?.criteria?.join(' '),g?.plain?.join(' '),g?.tags].join(' '));
      if(!text.includes(query)) continue;
      let score=0; const t=norm(e.title), code=norm(c?.[0]||'');
      if(t===query) score+=100; else if(t.startsWith(query)) score+=50; else if(t.includes(query)) score+=30;
      if(code&&code.includes(query)) score+=40;
      if(norm(chapterOf(e)).includes(query)) score+=5;
      if(g?.tags&&norm(g.tags).includes(query)) score+=10;
      scored.push({e,score});
    }
    return scored.sort((a,b)=>b.score-a.score||a.e.title.localeCompare(b.e.title)).slice(0,limit).map(x=>x.e);
  }
  function allMatches(q,chapter='all'){
    const query=norm(q);
    return entries.filter(e=>{
      if(chapter!=='all'&&e.chapterIndex!==Number(chapter)) return false;
      if(!query) return true;
      const g=guideOf(e), c=codeOf(e);
      const text=norm([e.title,chapterOf(e),c?.[0],g?.overview,g?.criteria?.join(' '),g?.plain?.join(' '),g?.tags].join(' '));
      return text.includes(query);
    });
  }
  function showSuggestions(q){
    const val=q.trim();
    if(val.length<2){suggest.hidden=true;search.setAttribute('aria-expanded','false');return;}
    const results=getSearchMatches(val,7);
    suggest.innerHTML=`<div class="suggestion-head">Best matches</div>`+(results.length?results.map(e=>{const c=codeOf(e);return `<button class="suggestion" role="option" type="button" data-suggest="${e.id}"><span><b>${esc(e.title)}</b><small>${esc(chapterOf(e))} · DSM p. ${e.page}</small></span><span class="suggestion-code">${esc(c?.[0]||'')}</span></button>`}).join(''):`<div class="recent-empty">No matching label, code, or saved study note.</div>`)+`<button class="suggestion" type="button" data-search-all="1"><span><b>See all matches</b><small>Search labels, codes, and current study notes</small></span><span>↗</span></button>`;
    suggest.hidden=false;search.setAttribute('aria-expanded','true');
  }
  function initSearch(){
    search.addEventListener('input',()=>showSuggestions(search.value));
    search.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();suggest.hidden=true;location.hash=`#/search/${encodeURIComponent(search.value.trim())}`;}if(e.key==='Escape'){suggest.hidden=true;search.blur();}});
    suggest.addEventListener('click',e=>{const b=e.target.closest('[data-suggest]');if(b){suggest.hidden=true;search.value='';location.hash=`#/entry/${b.dataset.suggest}`;return;}if(e.target.closest('[data-search-all]')){suggest.hidden=true;location.hash=`#/search/${encodeURIComponent(search.value.trim())}`;}});
    document.addEventListener('click',e=>{if(!document.getElementById('globalSearchWrap').contains(e.target))suggest.hidden=true;});
    document.addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();search.focus();}});
  }
  const entryCard=(e)=>`<a class="entry-card" href="${hrefEntry(e)}"><span class="entry-kind">${e.kind==='section'?'Classification group':'DSM-5-TR entry'}</span><h3>${esc(e.title)}</h3><div class="entry-meta"><span>Printed p. ${e.page}</span><span class="entry-code">${esc(codeOf(e)?.[0]||'')}</span></div></a>`;
  const chapterCard=(c,i)=>`<button class="chapter-card" type="button" data-chapter-open="${i}"><i class="chapter-dot" style="background:${iconDots[i%iconDots.length]}"></i><span><strong>${esc(c[0])}</strong><small>DSM printed p. ${c[1]} · ${chapterItems(i).filter(e=>e.kind==='entry').length} indexed topics</small></span></button>`;
  function renderHome(){
    const guidesCount=Object.keys(guidesByKey).length;
    const recents=recent.slice(0,5).map(i=>entries[i]).filter(Boolean);
    root.innerHTML=`<section class="hero"><div class="hero-copy"><div class="eyebrow">A calmer place to study</div><h1>Make room for<br>understanding.</h1><p>A private, organized way to explore DSM-5-TR classification topics, review key ideas, and practice careful thinking.</p><button class="hero-search-link" type="button" id="heroBrowse"><span>⌕</span> Start with a search or browse the library</button></div><div class="hero-orb" aria-hidden="true"><svg viewBox="0 0 100 100"><path d="M50 11c-13 0-21 10-21 22 0 6 2 12 7 16-13 3-23 14-23 28 0 13 10 22 23 22 6 0 11-2 14-6 4 4 9 6 15 6 13 0 23-9 23-22 0-14-10-25-23-28 5-4 7-10 7-16 0-12-8-22-21-22-6 0-11 2-15 7-3-5-8-7-14-7Z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M50 18v73M30 44c9 0 15 5 20 12m20-12c-9 0-15 5-20 12M30 67c8 0 15-3 20-9m20 9c-8 0-15-3-20-9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></div></section>
      <section class="stats-grid" aria-label="Study library overview"><div class="stat-card"><span class="stat-icon stat-lav">▤</span><span><strong>${entries.length}</strong><small>classification index rows</small></span></div><div class="stat-card"><span class="stat-icon stat-mint">✎</span><span><strong>${guidesCount}</strong><small>paraphrased study guides</small></span></div><div class="stat-card"><span class="stat-icon stat-peach">◷</span><span><strong>${recent.length}</strong><small>recent topics on this device</small></span></div></section>
      <div class="home-grid"><section><div class="section-head"><div><h2>Browse the classification</h2><p>Keep the DSM-5-TR’s original chapter order.</p></div><button class="link-button" type="button" data-route="library">View full index →</button></div><div class="panel"><div class="chapter-grid">${D.chapters.slice(0,8).map((c,i)=>chapterCard(c,i)).join('')}</div><div class="note-banner"><b>Source note:</b> chapter names and printed-page references come from the attached DSM-5-TR classification. Selected code mappings and study guides are shown only where reviewed; a blank code is not a claim that no code exists.</div></div></section>
      <section><div class="section-head"><div><h2>Your study tools</h2><p>Practice without turning a label into a diagnosis.</p></div></div><div class="quick-grid"><button class="quick-card" data-route="compare"><span class="quick-icon stat-lav">◫</span><span><strong>Compare topics</strong><small>Line up two or three entries</small></span></button><button class="quick-card" data-route="flashcards"><span class="quick-icon stat-mint">▱</span><span><strong>Flashcards</strong><small>Review labels, chapters, and notes</small></span></button><button class="quick-card" data-route="cases"><span class="quick-icon stat-peach">✳</span><span><strong>Fictional case lab</strong><small>Practice questions, not diagnosis</small></span></button></div><div class="section-head" style="margin-top:23px"><div><h2>Recently viewed</h2><p>Saved locally on this browser only.</p></div>${recents.length?'<button class="link-button" id="clearRecent">Clear</button>':''}</div><div class="panel recent-list">${recents.length?recents.map(e=>`<a class="recent-row" href="${hrefEntry(e)}"><span><strong>${esc(e.title)}</strong><small>${esc(chapterOf(e))}</small></span><span class="pill muted">p. ${e.page}</span></a>`).join(''):'<div class="recent-empty">Your recently viewed topics will appear here.</div>'}</div></section></div>`;
    root.querySelector('#heroBrowse').addEventListener('click',()=>{search.focus();});
    root.querySelectorAll('[data-route]').forEach(b=>b.addEventListener('click',()=>location.hash=`#/${b.dataset.route}`));
    root.querySelectorAll('[data-chapter-open]').forEach(b=>b.addEventListener('click',()=>location.hash=`#/chapter/${b.dataset.chapterOpen}`));
    const clear=root.querySelector('#clearRecent');if(clear)clear.addEventListener('click',()=>{recent=[];safeSet('mindfulAtlasRecent',[]);renderHome();});
  }
  function renderLibrary(query='',chapter='all'){
    navActivate(chapter==='all'?'library':'');
    const found=allMatches(query,chapter);
    const pageSize=48, pages=Math.max(1,Math.ceil(found.length/pageSize)); libState.page=Math.min(libState.page,pages-1);
    const show=found.slice(libState.page*pageSize,(libState.page+1)*pageSize);
    const ch=chapter==='all'?null:D.chapters[Number(chapter)];
    root.innerHTML=`${ch?`<section class="chapter-banner"><div><div class="eyebrow">DSM-5-TR classification · chapter ${Number(chapter)+1}</div><h1 class="page-title">${esc(ch[0])}</h1><p class="page-lede">Entries are arranged as in the attached manual. Printed reference begins on page ${ch[1]}.</p></div><span class="pill">${chapterItems(Number(chapter)).length} index rows</span></section>`:`<div class="route-header"><div><div class="eyebrow">DSM-5-TR classification</div><h1 class="page-title">Explore the library</h1><p class="page-lede">Browse the source classification or search names, selected codes, and reviewed study notes.</p></div></div>`}
      <div class="toolbar"><input class="filter-input" id="libraryFilter" value="${esc(query)}" placeholder="Filter by disorder, symptom, or code…" aria-label="Filter library"><select class="select" id="chapterFilter" aria-label="Filter by chapter"><option value="all">All chapters</option>${D.chapters.map((c,i)=>`<option value="${i}" ${String(chapter)===String(i)?'selected':''}>${esc(c[0])}</option>`).join('')}</select><span class="result-meta">${found.length} matching index rows · ${Math.min(pages,Math.ceil(found.length/pageSize)||1)} page${pages===1?'':'s'}</span></div>
      ${show.length?`<div class="library-grid">${show.map(entryCard).join('')}</div><div class="toolbar" style="justify-content:center;margin:18px 0"><button class="btn" id="prevPage" ${libState.page===0?'disabled':''}>← Previous</button><span class="pill muted">Page ${libState.page+1} of ${pages}</span><button class="btn" id="nextPage" ${libState.page>=pages-1?'disabled':''}>Next →</button></div>`:`<div class="empty-state">No matching entries in this chapter. Try a broader word, a chapter name, or an ICD-10-CM code.</div>`}`;
    root.querySelector('#libraryFilter').addEventListener('input',e=>{libState.q=e.target.value;libState.page=0;renderLibrary(libState.q,libState.chapter);const input=root.querySelector('#libraryFilter');input.focus();input.setSelectionRange(input.value.length,input.value.length);});
    root.querySelector('#chapterFilter').addEventListener('change',e=>{libState.chapter=e.target.value;libState.page=0;if(e.target.value==='all')location.hash='#/library';else location.hash=`#/chapter/${e.target.value}`;});
    root.querySelector('#prevPage')?.addEventListener('click',()=>{libState.page--;renderLibrary(libState.q,libState.chapter);});
    root.querySelector('#nextPage')?.addEventListener('click',()=>{libState.page++;renderLibrary(libState.q,libState.chapter);});
  }
  function renderSearch(query){
    const q=decodeURIComponent(query||'').replace(/\+/g,' ').trim();
    const found=allMatches(q);navActivate('library');
    root.innerHTML=`<div class="route-header"><div><div class="eyebrow">Search results</div><h1 class="page-title">${esc(q||'Search the library')}</h1><p class="page-lede">Matches include the classification label, reviewed code mappings, and the available paraphrased notes.</p></div><button class="btn" id="backToLibrary">Browse full index</button></div><div class="toolbar"><span class="result-meta" style="margin-left:0">${found.length} matching index rows. Symptom-term coverage is strongest for the reviewed study guides.</span></div>${found.length?`<div class="library-grid">${found.map(entryCard).join('')}</div>`:`<div class="empty-state">No matches found. Try a disorder name, a symptom phrase from a reviewed guide, or a code such as F84.0.</div>`}`;
    root.querySelector('#backToLibrary').addEventListener('click',()=>location.hash='#/library');
  }
  function list(items){return items?.length?`<ul>${items.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:'';}
  function renderEntry(id){
    const e=entryById(id); if(!e){root.innerHTML='<div class="empty-state">That study entry is not in the index. <a href="#/library">Return to the library</a>.</div>';return;}
    recent=[e.index,...recent.filter(i=>i!==e.index)].slice(0,12);safeSet('mindfulAtlasRecent',recent);
    const guide=guideOf(e), codes=codeOf(e), chapterPage=D.chapters[e.chapterIndex]?.[1]||0;
    const peers=entries.filter(x=>x.chapterIndex===e.chapterIndex&&x.kind==='entry'&&x.id!==e.id).slice(Math.max(0,entries.filter(x=>x.chapterIndex===e.chapterIndex&&x.kind==='entry').findIndex(x=>x.id===e.id)-1),Math.max(0,entries.filter(x=>x.chapterIndex===e.chapterIndex&&x.kind==='entry').findIndex(x=>x.id===e.id)-1)+4);
    const related=guide?.related?.map(n=>entries.find(x=>key(x.title)===key(n))).filter(Boolean).slice(0,4)||peers;
    root.innerHTML=`<div class="entry-detail"><div class="crumbs"><button type="button" data-breadcrumb="home">Overview</button><span>›</span><button type="button" data-breadcrumb="chapter">${esc(chapterOf(e))}</button><span>›</span><span>${esc(e.title)}</span></div><section class="detail-heading"><div class="eyebrow">${e.kind==='section'?'Classification group':'DSM-5-TR classification entry'}</div><h1 class="page-title">${esc(e.title)}</h1><div class="detail-meta"><span class="pill">${esc(chapterOf(e))}</span><span class="pill muted">DSM printed p. ${e.page}</span>${codes?`<span class="pill">ICD-10-CM ${esc(codes[0])}</span>`:''}</div></section>
      <div class="detail-grid"><div class="detail-main">${guide?`<section class="detail-card"><div class="official-label">Official criteria · paraphrased study outline</div><h2>Criteria at a glance</h2><p>${esc(guide.overview)}</p>${list(guide.criteria)}<div class="source-line"><span>Paraphrased from the DSM-5-TR diagnostic section</span><span>printed p. ${e.page}</span></div></section><section class="detail-card"><div class="official-label">Plain-language lens · educational, not diagnostic</div><h2>What the pattern can look like</h2>${list(guide.plain)}<div class="tag-row">${guide.tags.split(' ').slice(0,8).map(t=>`<span class="tag">${esc(t)}</span>`).join('')}</div></section><section class="detail-card"><h2>Specifiers & severity</h2><h3>Specifiers</h3>${list(guide.specifiers)}<h3>Severity / course</h3><p>${esc(guide.severity)}</p><div class="source-line"><span>Always check the current printed criteria before applying a code.</span><span>p. ${e.page}</span></div></section>`:`<section class="detail-card"><div class="official-label">Source-linked index entry</div><h2>Read the official criteria</h2><p>This label and printed-page reference were transcribed from the DSM-5-TR classification. A criterion-level paraphrase has not been independently prepared for this entry, so this page does not infer diagnostic criteria from the name.</p><div class="plain-box" style="margin-top:12px"><b>Study checklist:</b> In the official section, note the required symptom pattern, duration or course, functional impact, exclusions/differential, and any specifiers or severity rules.</div><div class="source-line"><span>DSM-5-TR printed page reference</span><span>p. ${e.page}</span></div></section><section class="detail-card"><h2>Code status</h2><p>${codes?`The code mapping shown here is a reviewed summary: <b>${esc(codes[0])}</b>. ${esc(codes[1])}`:'A single code was not independently matched to this label in this build. The DSM often lists code variants by subtype, substance, or specifier; consult the printed classification/criteria page. A blank code here does not mean “no code.”'}</p><div class="source-line"><span>Code references are ICD-10-CM (U.S.)</span><span>p. ${e.page}</span></div></section>`}
      <section class="detail-card"><h2>Keep exploring</h2><p>${guide?'Related entries in this study set; compare only what the source supports.':'Nearby entries in this chapter. Similar labels do not imply similar criteria.'}</p><div class="tag-row">${related.length?related.map(x=>`<a class="tag" href="${hrefEntry(x)}">${esc(x.title)} →</a>`).join(''):'<span class="tag">Browse the chapter index</span>'}</div></section></div>
      <aside class="detail-aside"><section class="detail-card"><h2>At a glance</h2><p><b>Chapter</b><br>${esc(chapterOf(e))}</p><div class="source-line"><span>Chapter starts</span><span>p. ${chapterPage}</span></div><div class="source-line"><span>Entry reference</span><span>p. ${e.page}</span></div><div class="source-line"><span>Review status</span><span>${guide?'Study guide':'Index only'}</span></div></section>${codes?`<section class="detail-card"><h2>ICD-10-CM</h2><div class="plain-box"><b>${esc(codes[0])}</b><br>${esc(codes[1])}</div></section>`:''}<section class="coverage-note"><b>Important:</b> This is a study aid, not a diagnostic instrument. A qualified clinician evaluates symptoms, context, culture, risk, and differential diagnoses.</section><button class="btn primary" type="button" id="addCompare">＋ Add to comparison</button><button class="btn" type="button" id="makeCard">▱ Study this as a flashcard</button></aside></div></div>`;
    root.querySelector('[data-breadcrumb="home"]').addEventListener('click',()=>location.hash='#/home');
    root.querySelector('[data-breadcrumb="chapter"]').addEventListener('click',()=>location.hash=`#/chapter/${e.chapterIndex}`);
    root.querySelector('#addCompare').addEventListener('click',()=>{if(!compareIds.includes(e.id)){compareIds=[...compareIds,e.id].slice(-3);safeSet('mindfulAtlasCompare',compareIds);}location.hash='#/compare';});
    root.querySelector('#makeCard').addEventListener('click',()=>{buildDeck('index',e.id);location.hash='#/flashcards';});
  }
  function renderCompare(){
    let ids=compareIds.filter(id=>entryById(id)); if(ids.length<2){const defaults=['autism spectrum disorder','attention-deficit/hyperactivity disorder'].map(n=>entries.find(e=>key(e.title)===key(n))?.id).filter(Boolean);ids=[...ids,...defaults.filter(x=>!ids.includes(x))].slice(0,2);}
    compareIds=ids.slice(0,3);safeSet('mindfulAtlasCompare',compareIds);
    const options=entries.filter(e=>e.kind==='entry');
    const selects=compareIds.map((id,i)=>`<select class="select compare-select" data-compare-select="${i}" aria-label="Choose comparison topic"><option value="">Choose a topic…</option>${options.map(e=>`<option value="${e.id}" ${e.id===id?'selected':''}>${esc(e.title)} · p.${e.page}</option>`).join('')}</select>`).join('');
    const selected=compareIds.map(entryById).filter(Boolean);
    const row=(label,fn)=>`<tr><th>${label}</th>${selected.map(e=>`<td>${fn(e)}</td>`).join('')}</tr>`;
    root.innerHTML=`<div class="route-header"><div><div class="eyebrow">Study side by side</div><h1 class="page-title">Compare topics</h1><p class="page-lede">Compare source references and reviewed notes. Missing comparison detail is labeled rather than guessed.</p></div><button class="btn" id="clearCompare">Reset</button></div><div class="compare-picks">${selects}<button class="btn soft" id="addCompareSlot" ${selected.length>=3?'disabled':''}>＋ Add topic</button></div><div class="compare-table-wrap" style="margin-top:15px"><table class="compare-table"><thead><tr><th>Compare</th>${selected.map(e=>`<th><a href="${hrefEntry(e)}">${esc(e.title)} ↗</a></th>`).join('')}</tr></thead><tbody>${row('Chapter',e=>esc(chapterOf(e)))}${row('DSM page',e=>`Printed p. ${e.page}`)}${row('ICD-10-CM',e=>{const c=codeOf(e);return c?`<b>${esc(c[0])}</b><br>${esc(c[1])}`:'No independently verified mapping in this build; check the cited page.'})}${row('Core framing',e=>{const g=guideOf(e);return g?esc(g.overview):'No criterion-level summary prepared; use the official reference.'})}${row('Criteria outline',e=>{const g=guideOf(e);return g?list(g.criteria):'Not summarized here; no inference from the label.'})}${row('Plain-language signs',e=>{const g=guideOf(e);return g?list(g.plain):'Not yet paraphrased and checked.'})}${row('Specifiers / severity',e=>{const g=guideOf(e);return g?`${list(g.specifiers)}<p>${esc(g.severity)}</p>`:'Consult the cited DSM section; no unverified specifiers are shown.'})}</tbody></table></div><div class="note-banner"><b>How to read this:</b> DSM categories overlap and criteria are not interchangeable. This tool does not determine whether a person meets a diagnosis.</div>`;
    root.querySelectorAll('[data-compare-select]').forEach(s=>s.addEventListener('change',()=>{const i=Number(s.dataset.compareSelect); if(s.value){compareIds[i]=s.value;compareIds=[...new Set(compareIds)].slice(0,3);safeSet('mindfulAtlasCompare',compareIds);renderCompare();}}));
    root.querySelector('#addCompareSlot').addEventListener('click',()=>{if(compareIds.length<3){compareIds.push('');root.querySelector('.compare-picks').insertAdjacentHTML('beforeend',`<select class="select compare-select" data-compare-select="${compareIds.length-1}" aria-label="Choose comparison topic"><option value="">Choose a topic…</option>${options.map(e=>`<option value="${e.id}">${esc(e.title)} · p.${e.page}</option>`).join('')}</select>`);root.querySelector(`[data-compare-select="${compareIds.length-1}"]`).addEventListener('change',ev=>{compareIds[compareIds.length-1]=ev.target.value;safeSet('mindfulAtlasCompare',compareIds.filter(Boolean));renderCompare();});}});
    root.querySelector('#clearCompare').addEventListener('click',()=>{compareIds=[];safeSet('mindfulAtlasCompare',[]);renderCompare();});
  }
  function buildDeck(mode='mix',focusId=''){
    const guided=entries.filter(e=>e.kind==='entry'&&guideOf(e));
    let base=mode==='guide'?guided:entries.filter(e=>e.kind==='entry');
    if(focusId){const focused=entryById(focusId);if(focused)base=[focused,...base.filter(e=>e.id!==focusId)];}
    if(mode==='mix'&&!focusId){const sample=guided.slice();while(sample.length<Math.min(22,base.length)){const x=base[Math.floor(Math.random()*base.length)];if(!sample.includes(x))sample.push(x);}base=sample;}
    if(mode==='index'&&!focusId)base=base.slice(0,120);
    flashDeck=base.map(e=>({entry:e,front:guideOf(e)?`What is a key feature of ${e.title}?`:`Which DSM-5-TR chapter includes “${e.title}”?`,back:guideOf(e)?guideOf(e).overview:`${chapterOf(e)} · printed p. ${e.page}${codeOf(e)?` · ICD-10-CM ${codeOf(e)[0]}`:''}`}));
    for(let i=flashDeck.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[flashDeck[i],flashDeck[j]]=[flashDeck[j],flashDeck[i]];}
    if(focusId){const at=flashDeck.findIndex(c=>c.entry.id===focusId);if(at>0)[flashDeck[0],flashDeck[at]]=[flashDeck[at],flashDeck[0]];}
    flashPos=0;flipped=false;
  }
  function renderFlashcards(){
    if(!flashDeck.length)buildDeck('mix');
    const card=flashDeck[flashPos]||{front:'No cards in this deck yet.',back:''};
    root.innerHTML=`<div class="route-header"><div><div class="eyebrow">Recall & reinforce</div><h1 class="page-title">Flashcards</h1><p class="page-lede">Practice chapter placement and reviewed study notes. The back of each card includes the source page.</p></div><select class="select" id="deckMode"><option value="mix">Mixed review</option><option value="guide">Reviewed guides</option><option value="index">Classification recall</option></select></div><div class="flashcard-stage"><div class="flashcard-count">Card ${flashPos+1} of ${flashDeck.length} · ${flipped?'answer':'prompt'}</div><button class="flashcard" id="flipCard" type="button" aria-label="Flip flashcard"><span class="flashcard-inner"><span class="card-label">${flipped?'A little more context':'Think it through'}</span><h2>${esc(flipped?card.back:card.front)}</h2><p>${flipped?`DSM-5-TR printed p. ${card.entry.page} · ${esc(chapterOf(card.entry))}`:'Tap the card or press Space to reveal the answer.'}</p></span></button><div class="flashcard-controls"><button class="btn" id="prevCard">← Previous</button><button class="btn soft" id="shuffleCards">Shuffle</button><button class="btn primary" id="nextCard">Next →</button></div><div class="flip-hint">Your place is temporary; nothing leaves this device.</div></div>`;
    root.querySelector('#flipCard').addEventListener('click',()=>{flipped=!flipped;renderFlashcards();});
    root.querySelector('#prevCard').addEventListener('click',()=>{flashPos=(flashPos-1+flashDeck.length)%flashDeck.length;flipped=false;renderFlashcards();});
    root.querySelector('#nextCard').addEventListener('click',()=>{flashPos=(flashPos+1)%flashDeck.length;flipped=false;renderFlashcards();});
    root.querySelector('#shuffleCards').addEventListener('click',()=>{buildDeck('mix');renderFlashcards();});
    root.querySelector('#deckMode').addEventListener('change',e=>{buildDeck(e.target.value);renderFlashcards();});
    document.onkeydown=e=>{if(e.code==='Space'&&currentRoute().page==='flashcards'&&!['INPUT','SELECT','TEXTAREA'].includes(document.activeElement.tagName)){e.preventDefault();flipped=!flipped;renderFlashcards();}if(e.key==='ArrowRight'&&currentRoute().page==='flashcards'){flashPos=(flashPos+1)%flashDeck.length;flipped=false;renderFlashcards();}if(e.key==='ArrowLeft'&&currentRoute().page==='flashcards'){flashPos=(flashPos-1+flashDeck.length)%flashDeck.length;flipped=false;renderFlashcards();}};
  }
  const cases=[
    {name:'Ari · attention and school',focus:'Neurodevelopmental assessment',story:'Ari, 13, frequently loses track of multistep assignments and interrupts in class. At home, a caregiver notices the same pattern with chores. Ari says sleep has been poor since a recent move.',question:'What would you ask about before forming a hypothesis?',answer:'Clarify the timeline, developmental history, settings, functional impact, sleep and stress context, and other possible explanations. A cross-setting pattern is relevant to ADHD criteria, but a brief vignette cannot establish a diagnosis.',page:'DSM pp. 68–76',chapter:0},
    {name:'Neha · sudden fear and avoidance',focus:'Anxiety differential',story:'Neha, 24, describes several abrupt episodes of intense fear with a pounding heart and dizziness. She has begun avoiding a crowded bus route after one episode there, but she is unsure whether attacks happen only in that situation.',question:'Which distinctions and follow-up questions matter?',answer:'Explore whether attacks are unexpected, what concern or behavior change followed, what situations are avoided and why, and medical/substance factors. Compare the Panic Disorder and Agoraphobia criteria; do not infer either from the short story.',page:'DSM pp. 235–250',chapter:4},
    {name:'Mateo · unwanted thoughts and rituals',focus:'Obsessive-compulsive spectrum',story:'Mateo, 31, spends substantial time repeating a checking routine because an unwanted thought says he may have left a door unlocked. He recognizes the routine feels excessive but becomes very distressed if interrupted.',question:'What would help characterize the pattern?',answer:'Ask about the thought’s form, the function of the repeated act, time burden, distress/impairment, insight, and alternatives. Compare the OCD criteria and specifiers with related disorders; the vignette is only a practice prompt.',page:'DSM pp. 265–294',chapter:5},
    {name:'Leena · memories after a frightening event',focus:'Trauma-related course',story:'After a serious accident, Leena, 28, reports unwanted memories, avoiding the intersection, disrupted sleep, and feeling unusually watchful. She says the symptoms began recently, but the exact dates are unclear.',question:'Why is the timeline important?',answer:'Clarify qualifying exposure, symptom clusters, onset, duration, impairment, safety, and medical/substance context. The manual distinguishes Acute Stress Disorder and PTSD partly by duration; compare their full criteria rather than labeling from a few symptoms.',page:'DSM pp. 301–318',chapter:6},
    {name:'Sam · changes in mood and energy',focus:'Mood episode history',story:'Sam, 20, seeks help for low mood and missed classes. A friend also recalls a past stretch when Sam slept very little, talked rapidly, and started several projects. Sam recalls it as a productive week, but dates and impact are uncertain.',question:'What history is essential before comparing mood diagnoses?',answer:'Map distinct episodes, duration, baseline change, energy and sleep, functioning, consequences, substances/medications, and any psychotic symptoms. Ask about past mania and hypomania; do not assume a diagnosis from the friend’s description.',page:'DSM pp. 139–210',chapter:2},
    {name:'Morgan · sleep difficulty',focus:'Sleep-wake assessment',story:'Morgan, 46, reports trouble falling asleep most nights for months and feels tired at work. They have rotating shifts and recently changed medication; they also worry about a breathing-related sleep problem.',question:'What context should shape the differential?',answer:'Clarify opportunity and circumstances for sleep, schedule and course, daytime impact, medications/substances, medical concerns, and other sleep disorders. Use the Insomnia and Sleep-Wake sections; a symptom alone does not establish Insomnia Disorder.',page:'DSM pp. 409–476',chapter:11}
  ];
  function renderCases(){
    root.innerHTML=`<div class="route-header"><div><div class="eyebrow">Fictional practice · no real client information</div><h1 class="page-title">Case lab</h1><p class="page-lede">Short fictional vignettes help you practice careful assessment and differential thinking—not diagnosis.</p></div><span class="pill">${cases.length} practice cases</span></div><div class="notice-important">These are invented learning scenarios. They do not reproduce real client stories and have no diagnostic “answer key.” Use them to practice questions, context, safety, and source-based differential reasoning.</div><div class="case-grid" style="margin-top:14px">${cases.map((c,i)=>`<article class="case-card"><div class="case-top"><span class="case-number">PRACTICE ${String(i+1).padStart(2,'0')}</span><span class="pill muted">${esc(c.focus)}</span></div><h3>${esc(c.name)}</h3><p>${esc(c.story)}</p><div class="case-question"><b>Practice prompt</b><br>${esc(c.question)}</div><div class="case-answer" id="caseAnswer${i}">${esc(c.answer)}</div><div class="case-footer"><span class="case-source">Source: ${esc(c.page)}</span><button class="btn soft" type="button" data-case-answer="${i}">Reveal reflection</button></div></article>`).join('')}</div>`;
    root.querySelectorAll('[data-case-answer]').forEach(b=>b.addEventListener('click',()=>{const i=b.dataset.caseAnswer;const a=root.querySelector(`#caseAnswer${i}`);a.classList.toggle('open');b.textContent=a.classList.contains('open')?'Hide reflection':'Reveal reflection';}));
  }
  function renderAbout(){
    root.innerHTML=`<div class="route-header"><div><div class="eyebrow">What this is—and isn’t</div><h1 class="page-title">About this study aid</h1><p class="page-lede">A private learning companion built around the attached DSM-5-TR (APA, 2022) PDF.</p></div></div><div class="about-grid"><section class="about-card"><h2>Source and coverage</h2><p>The chapter order and index labels were extracted from the DSM-5-TR Classification section in the uploaded PDF. Page references use the manual’s printed pagination. A small, clearly marked set of study guides paraphrases selected criteria; other entries remain source-linked index pages until their criteria and codes can be individually checked.</p><ul><li>Classification index entries: ${entries.length}</li><li>Paraphrased study guides: ${Object.keys(guidesByKey).length}</li><li>Selected ICD-10-CM mappings: ${Object.keys(codebook).length}</li></ul><p>Where a code is blank, this does not mean the DSM has no code. Some diagnoses use a code that depends on subtype, substance, episode, or specifier; unverified mappings are intentionally not guessed.</p></section><section class="about-card"><h2>How to use it</h2><p>Search labels, selected ICD-10-CM mappings, and the symptom vocabulary in reviewed notes. Browse the classification in its original chapter order, open a topic for its printed page reference, compare entries, and use flashcards for recall.</p><p>The recent-topic list and comparison selection use this browser’s local storage. No account, analytics, network service, or cloud sync is part of the site.</p></section><section class="about-card"><h2>Criteria and copyright</h2><p>Official criteria are paraphrased only in the study-guide subset; they are not reproduced verbatim. Other pages explicitly say when a detailed paraphrase has not been prepared. The attached manual remains the authority for exact wording, current codes, and clinical use.</p><p>This site is a personal educational aid, not an official APA product, diagnostic instrument, clinical recommendation, or substitute for a licensed clinician’s assessment.</p></section><section class="about-card"><h2>Privacy and safety</h2><p>Everything runs in this local browser tab. Search queries and viewed-topic history are not transmitted. Do not enter identifying client information into this study aid.</p><div class="notice-important">If a real person may be in immediate danger, use local emergency or crisis supports and follow your training and supervision protocols.</div></section></div>`;
  }
  function render(){
    document.onkeydown=null;
    const r=currentRoute(); navActivate(r.page==='chapter'?'':r.page);
    document.querySelectorAll('#chapterNav [data-chapter]').forEach(b=>b.classList.toggle('active',r.page==='chapter'&&b.dataset.chapter===r.arg));
    if(r.page==='home') renderHome();
    else if(r.page==='library'){libState.q='';libState.chapter='all';libState.page=0;renderLibrary('','all');}
    else if(r.page==='chapter'){libState.q='';libState.chapter=r.arg;libState.page=0;renderLibrary('',r.arg);}
    else if(r.page==='search') renderSearch(r.arg);
    else if(r.page==='entry') renderEntry(r.arg);
    else if(r.page==='compare') renderCompare();
    else if(r.page==='flashcards') renderFlashcards();
    else if(r.page==='cases') renderCases();
    else if(r.page==='about') renderAbout();
    else renderHome();
    if(r.page!=='flashcards') document.onkeydown=null;
    closeMobile();
    if(root) root.focus({preventScroll:true});
  }
  setupNav(); initSearch();
  document.querySelectorAll('[data-route]').forEach(b=>b.addEventListener('click',()=>location.hash=`#/${b.dataset.route}`));
  window.addEventListener('hashchange',render);
  if(!location.hash) location.hash='#/home'; else render();
})();
