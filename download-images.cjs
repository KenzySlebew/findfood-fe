const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });

const images = [
  ['katalog-nasikotak.jpg', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLYRcRgczLSTi8zenwxxe9Wxuh0ZgnHYBMiJyBAeU0CZAmwLy7AkDmVM777rG9E86XYwI-EZ3Ywbur3ZHwMwBrPqOGc7bwdtQrJqXuC58JfNd7LHuEeoeZ0YvyI00lOQdr4S6USGQ_rxyoONzh60dt0p9BXJKYuuQieLkpDFTQrYuqKNCeq1UYg2f9OoVYo3JkkNqtBOXrDiz5m-cE0Y8f9zlS2wk2wK3WB_kKlxYzmoyEIZIn0QbCYQ'],
  ['katalog-bulgogi.jpg', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrhRA9-574SysqDhYAH5EWEK0cUgKovYV0CfiRXr54W5v-GRO_fvXm-ygo9W_Zy09ndCSv3H4Ke0OvBxDyx0aEhFmOz9aFhC06FstDiT2d_oIneCldhExzmOrGgo9_Z0NB3CcZsCmaIF2Uo2XVesouif_QCuwzx09ECcykrog4NevRcSxtYc8Kt5AXBhhEpZJtg91HWr0pVtNhHRcujCBKQLU8-8bhwZ3f5tyRn4fNHgBHHoWE-41Cdw'],
  ['katalog-liwet.jpg', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDi5DZ0jSviQDB0gy1D78DEfjuVp_R42OUiN5kGVLOoycFFogBNzhkVoN2H9imHFrZPg-Xj5pSdXDLzgEv19VmG-6eREsIDsg7Ni8x5jeZ7qdYOsgD68z3hCPKhjEksn27bofrA4I5mpoqKkRnMOuGn8n39MH0Ux-T56dpXE1bRKvvqzHL60F6sCS5TLmT2aZp1zYnBCPogWRiiTnjp51c-Q0CHccq_ReqUvUOAJDC49lZsoD79yzZBdA'],
  ['katalog-quinoa.jpg', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJW9eJviil3FTyCd-V8IVWdMAaV9DNNw0DMmDVrL8vcp5oYNqLmo3BnDtXDGWkgVbvvY9u8bMI0xHbHikcHv7OdNviZCYPfeRc8nDrPVmvZloKM13hTdKVdBgGcUQZo4JHGNdS-7M3MlfFLCRcYo5kyw-4SVeoA5DrJvs93mQxL-ZzSmakBCx0j1ulO12uTc2mYLHWaULN_n3qWbA5wMjt0cU-zIexR1sjXebXwA7oGfBFC7dJ6jt-3g'],
  ['katalog-salmon.jpg', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyskarhyEuCpFl82WTIqUS9ImQJZOJ_jS2H50X3iQQPLdv4sVhjE2nwd8LGA3Ap3H8AK_P4V8ALk0hb1bMpJ0Yu79pIg_e8owKEQX_HMTcfenIWLwULb3SckzzPY4p1fam9So493EOw2dYAQsKTjIrbq4P-xtvq5WrCO1SGyoleEqm0R75iisvGDGA7fcFT4Oa6Mpv6UCTRRvJcVn4WyASyQnJ9V9zZQMaLGa2xIWX1mlNeIpKBrAY_Q'],
  ['katalog-snackbox.jpg', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBeJXlrNmCIXv9FqZHtr3OvXeF-LrcEpiFkShRPJNTjLsfioddMxsCPZKw4Yx4YFbD_9P-chQma_gRl45woHnX_qk0W-1i51p5jbuO1JQbehcdqihO3srESox1tktaGa1lj28PR2D1-nLmeQQhe3m-C6B60gzNAudrgfIs_7JrpGVdd5xC_yTAd7rZWZ83m1zadUBFovUpsWy605SHOJA1OjNmO0SItibbp7dX3c813Ba_hveQkdNvG-Q'],
  ['katalog-soto.jpg', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCi70jzHBK3SQtg4HXPduezCMGoGCzhj9idZKpnwqPXhPTTYscF44pXRNs3xFzg0-kDP4W-R-x0vzlgvP83CP9l9Syelj2FFFVFWOX8KPOeDdIoTyJgWvLxys5XPhaAKfRf7WCQ90mfi2NO37jqeRJmVpcX9wJd3e5UDOucT2IJ4QiJmLToWS2ul3uYd3AlFcA_SxRwpLArX6C6WzwsTF6-g1SqgasdZvTQJS1eP11BHdv9S1jhKz7_WA'],
  ['katalog-tumpeng.jpg', 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4fJKjLGg5uZnkg37JqbTBdwWmTwEwHrRY_LkfnuiIezGwSHmz61ub1fcoumXVOZilYcrdsT9gsroARyS5Fh1-zB4csA0WmgOOggopWRSyOD5DzHo_XuuiplmqBkRbuN_96L4VhYQKDG39cLhQ0VbmIgj8qH6PdkLo5HVKrCkVewQX2ZbLl3tY8rkBfAzQBmI8F3W6WHIuOGhCFaZy7DdUrdihcRtuZ9w41lpg-l_TZcNSD9uREWu_4w'],
  ['pricing-bento.jpg', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaldDvvW0jAZ-55pcNSGZtUlUkZfJJAGjr5RL_3L1g0odVO_4QF6Zyj2VAHwkjzYXt_nJgmrNpQd99IffiqT8oJgdSHXS69uTQStGHSHexkQ0BGFj3anZsD_JkEbA1RvwEw9qD5gdEW7M0T02W4dmKv2o0MNvDN-eIDVLaeUQhnesW9uT58wbpeBJutOKkkT5IMc_DaE4Ak6hrIa03rwR76PZvVQQoDYVEIXrkVYlM6j2s-x73_-iLyw'],
  ['pricing-map.jpg', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoIEes2PFceumtH0cirW85BKvCVTtE6IR3ZL4qeKvFXmxHjH2RKW56QwKcsdyXLfn0JuvUm8y5O8cO-G5XGnEfRe6iT_8eGfjDPZbtgTzSwc8sTprf468M00MjOCj7t4E8JPPt8QixbOvD-gjfuU-4t6LlLYQ5aUe5W4uviebDH7RJf7yOuILqyShhojvm6kzb4sIRkz4eChH0jXJHQ_iZVMEfFen2SGGT2vdUgBBqHeU73TQuHkoNOw'],
];

for (const [name, url] of images) {
  const dest = path.join(imgDir, name);
  if (!fs.existsSync(dest)) {
    try {
      execSync(`curl.exe -L -s -o "${dest}" "${url}"`, { timeout: 15000 });
      console.log('Downloaded', name);
    } catch (e) {
      console.error('Failed', name, e.message);
    }
  } else {
    console.log('Exists', name);
  }
}
console.log('Done!');
