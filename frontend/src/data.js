export const NAV = [['home', 'Home'], ['about', 'About'], ['programs', 'What We Do'], ['gallery', 'Gallery'], ['values', 'Our Values'], ['founder', 'Founder'], ['contact', 'Contact']]

export const PROGRAMS = [
  ['Mentorship & personal development', 'favorite', 'brand', 'One-to-one guidance and group mentorship that builds confidence, identity and life direction.', ['Monthly mentor circles', 'Goal-setting', 'Confidence workshops']],
  ['SRHR & life skills', 'health_and_safety', 'sky', 'Age-appropriate education on health, consent, relationships and informed decision-making.', ['Puberty & health talks', 'Consent education', 'Safe-choices sessions']],
  ['Community engagement & empowerment', 'groups', 'sun', 'Working with families, schools and community leaders to create supportive ecosystems.', ['Parent forums', 'School partnerships', 'Leader dialogues']],
  ['Education & scholarships', 'school', 'violet', 'Keeping girls and boys in school through materials, tuition support and advocacy.', ['School kits', 'Tuition support', 'Retention follow-up']],
  ['GBV prevention & child protection', 'shield', 'mint', 'Teaching boundaries, safe reporting and building protection systems that truly work.', ['Safeguarding training', 'Reporting pathways', 'Safe-space clubs']],
  ['Support for girls and boys', 'volunteer_activism', 'brand', 'Inclusive spaces where every young person is seen, heard and equipped to thrive.', ['Peer clubs', 'Leadership training', 'Career exposure']]
]

export const STATS = [
  ['1,000+', 'Young people mentored', 'Through sustained 1:1 mentorship', 'diversity_3'],
  ['5000', 'Girls reached', 'With health & life skills education', 'girl'],
  ['500+', 'Students supported', 'Through school materials & advocacy', 'school'],
  ['300+', 'Women empowered', 'Skills & leadership training', 'volunteer_activism'],
  ['200+', 'Youth in work', 'Helped into work & opportunities', 'work']
]

export const STEPS = [
  ['Listen', 'hearing', 'We start by listening to young people, parents and teachers, so every programme answers a real need.'],
  ['Protect', 'shield_with_heart', 'Safe spaces, clear boundaries and trusted reporting channels come before anything else.'],
  ['Mentor', 'diversity_1', 'Each young person is matched with a trusted adult who walks with them, month after month.'],
  ['Equip', 'construction', 'Leadership, money skills, health knowledge and education support turn confidence into capability.'],
  ['Launch', 'rocket_launch', 'Graduates move into school, work and service, and become mentors for the next cohort.']
]

export const VALUES = [
  ['N', 'Nurture Identity', 'Helping children discover their worth and their voice.', 'Through story circles, affirmation work and creative expression, every child learns who they are before the world tells them who to be.'],
  ['A', 'Aspire with Purpose', 'Encouraging dreams, education, and intentional living.', 'We help young people set goals, map the steps and celebrate each one, turning dreams into plans.'],
  ['K', 'Keep Safe', 'Teaching child protection, healthy relationships, consent, and boundaries in age-appropriate ways.', 'Safe-space rules, body-safety lessons and a clear, confidential way to speak up.'],
  ['A', 'Acquire Skills', 'Building leadership, communication, financial literacy, and practical life skills.', 'Hands-on workshops on public speaking, saving, budgeting, digital skills and employability.'],
  ['J', 'Journey with Mentors', 'Connecting young people with trusted adults who guide and encourage them.', 'Vetted, trained mentors commit to a season of consistent, caring presence.'],
  ['A', 'Advance and Serve', 'Equipping them to become leaders who positively impact others.', 'Alumni lead community projects, mentor younger peers and speak up for others.'],
  ['H', 'Hope and Transformation', 'Help individuals rise above limiting circumstances, embrace possibilities, and become agents of positive change.', 'Hope is the outcome we care about most: new choices, new confidence, new futures.']
]

export const WAYS = [
  ['handshake', 'Partner with us', 'Organisations, schools and funders co-design programmes that reach more young people.', 'brand'],
  ['volunteer_activism', 'Volunteer as a mentor', 'Give a few hours a month. Training and safeguarding support are provided.', 'sky'],
  ['redeem', 'Sponsor a girl’s education', 'Cover school materials, tuition support and mentorship for a girl for a year.', 'sun'],
  ['school', 'Invite us to your school', 'Bring SRHR, life-skills and child-protection sessions to your students.', 'violet']
]

export const FAQ = [
  ['Who does NAKAJAH work with?', 'Children, adolescents, young people and women across Nigeria and the wider African region, with parents, schools and community leaders as partners.'],
  ['How do you keep children safe?', 'Every staff member and mentor is vetted and trained in safeguarding. We follow a child protection policy, use age-appropriate content, and provide confidential reporting channels.'],
  ['Can I volunteer if I am not in Nigeria?', 'Yes. Remote mentoring, skills sessions, design and fundraising support are all open to volunteers anywhere.'],
  ['How is my support used?', 'Contributions fund mentorship programmes, school materials, safe-space activities and training. We share progress with partners regularly.'],
  ['How do I get help for a child or young person?', 'Use the “Get support” button or contact us. In an emergency, always contact local emergency services first (112 in Nigeria).']
]

export const TONES = {
  brand: ['bg-brand-100', 'text-brand-500'],
  sky: ['bg-sky-100', 'text-sky-500'],
  sun: ['bg-sun-100', 'text-sun-500'],
  violet: ['bg-violet-100', 'text-violet-500'],
  mint: ['bg-mint-100', 'text-mint-500']
}

/* Gallery: add photos to a category's `photos` list as [file, width, height, alt]; files live in public/img/gallery/<id>/ */
const G = (id, list) => list.map(([f, w, h, alt]) => ({ src: `/img/gallery/${id}/${f}`, w, h, alt }))
export const GALLERY = [
  { id: 'school-outreach', label: 'School Outreach', icon: 'school', blurb: 'Taking girl-child talks, life skills and mentorship into classrooms and school compounds.',
    photos: G('school-outreach', [
      ['11.jpg', 992, 744, 'Girls in pink with the NAKAJAH team at the Digital Generation Girl Child Day celebration'],
      ['5.jpg', 867, 1156, 'Founder presenting an International Day of the Girl Child slide to a darkened classroom'],
      ['2.jpg', 867, 1156, 'Founder speaking with nursery pupils in bright green kits in a school courtyard'],
      ['7.jpg', 521, 1156, 'Girls in pink seated during the Girl Child Day programme'],
      ['4.jpg', 1156, 521, 'Founder seated among nursery pupils in green kits'],
      ['1.jpg', 867, 1156, 'Pupils seated on red chairs watching a projector presentation'],
      ['8.jpg', 1156, 521, 'Girl Child Day group photo in front of the Digital Generation banner'],
      ['3.jpg', 867, 1156, 'Young pupils looking up attentively as the founder speaks'],
      ['6.jpg', 1156, 521, 'Founder and a colleague with nursery pupils after the session'],
      ['9.jpg', 1156, 521, 'Girls in pink posing with the NAKAJAH team and school staff'],
      ['10.jpg', 1156, 521, 'Founder with nursery pupils and school staff in the courtyard']
    ]) },
  { id: 'menstrual-hygiene', label: 'Menstrual Hygiene', icon: 'water_drop', blurb: 'Dignity, education and supplies for girls.',
    photos: G('menstrual-hygiene', [
      ['1.jpg', 810, 1080, 'Girls and women holding up sanitary pads after the menstrual hygiene session'],
      ['6.jpg', 1080, 810, 'Schoolgirls in uniform holding up sanitary pads beside the founder'],
      ['9.jpg', 608, 1080, 'Founder demonstrating pad use to students in a classroom'],
      ['3.jpg', 810, 1080, 'Group photo of girls and guests celebrating with sanitary pads'],
      ['5.jpg', 608, 1080, 'Students seated at desks during the menstrual hygiene talk'],
      ['7.jpg', 608, 1080, 'Founder holding up a sanitary pad while teaching'],
      ['4.jpg', 608, 1080, 'A student attentively opening her pack of sanitary pads'],
      ['11.jpg', 810, 1080, 'Founder outside the school before the session'],
      ['10.jpg', 608, 1080, 'Founder speaking to students about menstrual health'],
      ['8.jpg', 608, 1080, 'Students sharing and opening sanitary pad packs at their desks'],
      ['2.jpg', 810, 1080, 'Founder in conversation with a young woman before the programme'],
      ['12.jpg', 651, 1156, 'Founder explaining menstrual hygiene to the class'],
      ['14.jpg', 608, 1080, 'Students listening in class'],
      ['13.jpg', 651, 1156, 'Founder with a box of sanitary pads facing the class']
    ]) },
  { id: 'feeding-the-street', label: 'Feeding the Street', icon: 'restaurant', blurb: 'Hot meals and care for people living on the street.',
    photos: G('feeding-the-street', [
      ['1.jpg', 576, 1280, 'The NAKAJAH team smiling together on the way to a feeding outreach']
    ]) },
  { id: 'christmas', label: 'Christmas', icon: 'redeem', blurb: 'Festive outreach, gifts and joy for children and families.',
    photos: G('christmas', [
      ['6.jpg', 810, 1080, 'Children and a volunteer sorting through donated clothes by the roadside'],
      ['7.jpg', 810, 1080, 'Children picking out clothes and shoes from the donation display'],
      ['8.jpg', 810, 1080, 'Community members choosing donated clothes during the Christmas outreach'],
      ['9.jpg', 810, 1080, 'Community members choosing donated clothes during the Christmas outreach'],
      ['10.jpg', 810, 1080, 'Community members choosing donated clothes during the Christmas outreach'],
      ['11.jpg', 563, 1000, 'Community members choosing donated clothes during the Christmas outreach'],
      ['12.jpg', 810, 1080, 'Community members choosing donated clothes during the Christmas outreach'],
      ['13.jpg', 608, 1080, 'Community members choosing donated clothes during the Christmas outreach'],
      ['14.jpg', 563, 1000, 'Community members choosing donated clothes during the Christmas outreach'],
      ['15.jpg', 810, 1080, 'Community members choosing donated clothes during the Christmas outreach'],
      ['16.jpg', 810, 1080, 'Community members choosing donated clothes during the Christmas outreach'],
      ['17.jpg', 810, 1080, 'Community members choosing donated clothes during the Christmas outreach'],
      ['18.jpg', 810, 1080, 'Volunteers and community members choosing clothes from the donated pile'],
      ['19.jpg', 810, 1080, 'Community members choosing donated clothes during the Christmas outreach'],
      ['20.jpg', 608, 1080, 'Community members choosing donated clothes during the Christmas outreach'],
      ['21.jpg', 563, 1000, 'Community members choosing donated clothes during the Christmas outreach'],
      ['22.jpg', 563, 1000, 'Community members choosing donated clothes during the Christmas outreach'],
      ['23.jpg', 563, 1000, 'Community members choosing donated clothes during the Christmas outreach'],
      ['24.jpg', 563, 1000, 'Community members choosing donated clothes during the Christmas outreach'],
      ['25.jpg', 563, 1000, 'Community members choosing donated clothes during the Christmas outreach'],
      ['26.jpg', 608, 1080, 'Community members choosing donated clothes during the Christmas outreach'],
      ['27.jpg', 608, 1080, 'Community members choosing donated clothes during the Christmas outreach'],
      ['28.jpg', 608, 1080, 'Women and children browsing donated clothes and shoes on the pavement'],
      ['29.jpg', 1080, 810, 'Volunteer and a young woman at the clothing display'],
      ['30.jpg', 1000, 750, 'Community members choosing donated clothes during the Christmas outreach'],
      ['31.jpg', 1080, 810, 'Community members choosing donated clothes during the Christmas outreach'],
      ['32.jpg', 608, 1080, 'Community members choosing donated clothes during the Christmas outreach'],
      ['1.jpg', 1000, 750, 'Donated clothes and shoes laid out on the steps'],
      ['2.jpg', 750, 1000, 'Bags of donated items at the outreach point'],
      ['3.jpg', 750, 1000, 'Bags of donated items at the outreach point'],
      ['4.jpg', 810, 1080, 'Donated items and a sign at the outreach point'],
      ['5.jpg', 750, 1000, 'A volunteer holding a bag of donated items']
    ]) }
]
